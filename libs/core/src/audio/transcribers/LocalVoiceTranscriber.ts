// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import type { IDictationOptions } from './IDictationOptions';
import type { IDictationResult } from './IDictationResult';
import type { ILiveVoiceTranscriber } from './ILiveVoiceTranscriber';
import type { ILocalVoiceTranscriberOptions } from './ILocalVoiceTranscriberOptions';
import type { ITranscriptionInput } from './ITranscriptionInput';
import { LOCAL_VOICE_TRANSCRIBER_OPTIONS } from './LOCAL_VOICE_TRANSCRIBER_OPTIONS';

// #endregion

/**
 * How a recognition session ends. Manual sessions restart after pauses, single sessions end
 * with the first result, and dictations finish when the browser ends the session.
 */
type RecognitionMode = 'manual' | 'single' | 'dictation';

interface IRecognitionOutcome {
    readonly transcript: string;
    readonly error?: Error;
}

/**
 * Availability of an on-device dictation language pack.
 */
type SpeechRecognitionAvailability = 'available' | 'downloadable' | 'downloading' | 'unavailable';

/**
 * Options of the non-standard on-device dictation probe.
 */
interface ISpeechRecognitionOptions {
    readonly langs: ReadonlyArray<string>;
    readonly processLocally: boolean;
    readonly quality: 'command' | 'conversation' | 'dictation';
}

/**
 * The Web Speech recognition engine. The DOM library types its events but not the engine itself,
 * and `processLocally` plus the audio-track overload of `start()` are Chromium extensions.
 */
interface ISpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    processLocally: boolean;
    start(audioTrack?: MediaStreamTrack): void;
    stop(): void;
    abort(): void;
    onend?: (event: Event) => void;
    onerror?: (event: SpeechRecognitionErrorEvent) => void;
    onresult?: (event: SpeechRecognitionEvent) => void;
}

/**
 * The recognition constructor, including the Chromium on-device dictation statics.
 */
interface ISpeechRecognitionConstructor {
    new (): ISpeechRecognition;
    available?(options: ISpeechRecognitionOptions): Promise<SpeechRecognitionAvailability>;
    install?(options: ISpeechRecognitionOptions): Promise<boolean>;
}

/**
 * A window that may expose speech recognition under its standard or vendor-prefixed name.
 */
interface ISpeechRecognitionWindow extends Window {
    SpeechRecognition?: ISpeechRecognitionConstructor;
    webkitSpeechRecognition?: ISpeechRecognitionConstructor;
}

/**
 * Browser-based {@link ILiveVoiceTranscriber} over the Web Speech API.
 *
 * A live session runs continuously: the engine is restarted whenever the browser ends it after a
 * speech pause, and interim results are joined into the running transcript, so a dictation keeps
 * going until the user stops it. When the browser offers an on-device dictation language pack it
 * is used — and downloaded in the background if necessary — which keeps the audio on the device;
 * otherwise recognition falls back to the browser's own service. Passing the already authorized
 * microphone track of a running recording avoids a second permission prompt.
 *
 * @public
 */
@Injectable()
export class LocalVoiceTranscriber implements ILiveVoiceTranscriber {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);
    private readonly _options: ILocalVoiceTranscriberOptions = inject(LOCAL_VOICE_TRANSCRIBER_OPTIONS, { optional: true }) ?? {};
    private readonly _interimResults: boolean;
    private readonly _language: string;
    private readonly _maxAlternatives: number;
    private _audioTrack: MediaStreamTrack | null = null;
    private _completedError: Error | null = null;
    private _completedTranscript = '';
    private _finalTranscript = '';
    private _interimTranscript = '';
    private _mode: RecognitionMode = 'single';
    private _recognition: ISpeechRecognition | null = null;
    private _resolveSession: ((outcome: IRecognitionOutcome) => void) | null = null;
    private _sessionPromise: Promise<IRecognitionOutcome> | null = null;
    private _onTranscript: IDictationOptions['onTranscript'];
    private _stopRequested = false;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `LocalVoiceTranscriber` class. Its configuration comes from
     * {@link LOCAL_VOICE_TRANSCRIBER_OPTIONS}; without that binding the documented defaults apply.
     *
     * @public
     */
    public constructor() {
        this._interimResults = this._options.interimResults ?? false;
        this._language = this._options.language ?? 'en-US';
        this._maxAlternatives = this._options.maxAlternatives ?? 1;
    }

    // #endregion

    // #region Properties

    /**
     * Marks this strategy as recognizing speech while a session is active.
     *
     * @public
     * @readonly
     */
    public readonly supportsLiveSessions = true as const;

    /** Whether the current browser exposes its speech recognition API. */
    public get isSupported(): boolean {
        return this.findRecognitionConstructor() !== undefined;
    }

    // #endregion

    // #region Methods

    /**
     * Starts continuous recognition that stays active across speech pauses until it is stopped.
     *
     * @public
     * @param audioTrack Already authorized live microphone track to recognize instead of the
     * browser default.
     * @returns A promise that resolves once recognition runs.
     * @throws Error when the browser has no speech recognition or a session is already active.
     */
    public async startSession(audioTrack?: MediaStreamTrack): Promise<void> {
        await this.beginRecognition('manual', audioTrack);
    }

    /**
     * Stops a manually controlled recognition session and returns its accumulated text.
     *
     * @public
     * @returns The recognized text of the session.
     * @throws Error when the session ended with a recognition failure.
     */
    public async stopSession(): Promise<string> {
        const sessionPromise = this._sessionPromise;

        if (!sessionPromise) {
            return this.readCompletedTranscript();
        }

        this._stopRequested = true;

        if (this._recognition) {
            try {
                this._recognition.stop();
            } catch (error: unknown) {
                this.completeSession(this.toError(error));
            }
        } else {
            this.completeSession();
        }

        return this.readOutcome(await sessionPromise);
    }

    /**
     * Aborts an active recognition session and discards its result.
     *
     * @public
     */
    public cancelSession(): void {
        const recognition = this._recognition;

        this._completedError = null;
        this._completedTranscript = '';
        this._finalTranscript = '';
        this._interimTranscript = '';
        this.completeSession();

        if (recognition) {
            try {
                recognition.abort();
            } catch {
                /** The recognition engine already ended and is cleaned up below. */
            }
        }
    }

    /**
     * Recognizes one utterance from the microphone. Browser speech recognition cannot read a
     * recorded blob, so the recorded audio of `input` is ignored and the engine listens instead;
     * a caller that wants recognition while recording uses {@link startSession} instead.
     *
     * @public
     * @param _input The recorded audio, which this strategy cannot replay.
     * @returns The recognized text.
     * @throws Error when the browser has no speech recognition or recognition failed.
     */
    public async transcribe(_input: ITranscriptionInput): Promise<string> {
        const { completion } = await this.beginRecognition('single');
        return this.readOutcome(await completion);
    }

    /**
     * Starts dictation with the browser's default recognition engine. Delivers interim updates until
     * the browser ends the session, or the caller stops it with {@link stopSession}.
     *
     * @public
     * @param options Dictation configuration and transcript callback.
     * @returns The final transcript or the error code.
     */
    public async dictate(options: IDictationOptions = {}): Promise<IDictationResult> {
        if (!this.isSupported) {
            return { transcript: '', errorCode: 'unsupported' };
        }

        try {
            const { completion } = await this.beginRecognition('dictation', undefined, options);
            const result = await completion;

            return result.error ? { transcript: '', errorCode: result.error.message } : { transcript: result.transcript };
        } catch {
            return { transcript: '', errorCode: 'start-failed' };
        }
    }

    /**
     * Starts a recognition session in the requested mode.
     *
     * @param mode Session lifetime.
     * @param audioTrack Already authorized live microphone track.
     * @param dictation Optional dictation configuration.
     */
    private async beginRecognition(
        mode: RecognitionMode,
        audioTrack?: MediaStreamTrack,
        dictation?: IDictationOptions,
    ): Promise<{ readonly completion: Promise<IRecognitionOutcome> }> {
        if (this._sessionPromise) {
            throw new Error('A speech recognition session is already active.');
        }

        const recognitionConstructor = this.findRecognitionConstructor();
        if (!recognitionConstructor) {
            throw new Error('SpeechRecognition API not supported in this browser.');
        }

        this._completedError = null;
        this._completedTranscript = '';
        this._finalTranscript = '';
        this._interimTranscript = '';
        this._mode = mode;
        this._audioTrack = audioTrack ?? null;
        this._recognition = null;
        this._stopRequested = false;
        this._onTranscript = dictation?.onTranscript;
        const completion = new Promise<IRecognitionOutcome>((resolve) => {
            this._resolveSession = resolve;
        });
        this._sessionPromise = completion;

        const processLocally = mode === 'dictation' ? false : await this.prepareLocalDictation(recognitionConstructor);

        if (completion !== this._sessionPromise) {
            return { completion };
        }

        let recognition: ISpeechRecognition;
        try {
            recognition = new recognitionConstructor();
        } catch (error) {
            this.completeSession(this.toError(error));
            throw error;
        }

        recognition.continuous = mode === 'manual' || dictation?.continuous === true;
        recognition.interimResults = mode !== 'single' || this._interimResults;
        recognition.lang = dictation?.language ?? this._language;
        recognition.maxAlternatives = this._maxAlternatives;
        recognition.processLocally = processLocally;
        recognition.onend = (): void => this.onRecognitionEnd(recognition);
        recognition.onerror = (event: SpeechRecognitionErrorEvent): void => this.onRecognitionError(recognition, event);
        recognition.onresult = (event: SpeechRecognitionEvent): void => this.onRecognitionResult(recognition, event);
        this._recognition = recognition;

        const startError = this.startRecognition(recognition);

        if (startError) {
            throw startError;
        }

        return { completion };
    }

    /**
     * Splits one recognition event into final and interim text.
     *
     * @param event Browser recognition event.
     */
    private collectTranscript(event: SpeechRecognitionEvent): void {
        let interimTranscript = '';

        for (let index = event.resultIndex; index < event.results.length; index += 1) {
            const result = event.results[index];
            const transcript = result?.[0]?.transcript ?? '';

            if (result?.isFinal) {
                this._finalTranscript = this.joinText(this._finalTranscript, transcript);
            } else {
                interimTranscript = this.joinText(interimTranscript, transcript);
            }
        }

        this._interimTranscript = interimTranscript;
    }

    /**
     * Ends the active session and releases the caller waiting on it.
     *
     * @param error Recognition failure delivered to the caller.
     */
    private completeSession(error?: Error): void {
        const resolve = this._resolveSession;
        const transcript = this.joinText(this._finalTranscript, this._interimTranscript);

        this._completedError = error ?? null;
        this._completedTranscript = error ? '' : transcript;
        this._audioTrack = null;
        this._recognition = null;
        this._resolveSession = null;
        this._sessionPromise = null;
        this._onTranscript = undefined;
        this._stopRequested = false;
        resolve?.({ transcript: this._completedTranscript, error });
    }

    /**
     * Joins two transcript fragments with a single separating space.
     *
     * @param existingText Text recognized so far.
     * @param nextText Text to append.
     * @returns The joined transcript.
     */
    private joinText(existingText: string, nextText: string): string {
        const normalizedExistingText = existingText.trim();
        const normalizedNextText = nextText.trim();

        if (!normalizedExistingText) {
            return normalizedNextText;
        }

        if (!normalizedNextText) {
            return normalizedExistingText;
        }

        return `${normalizedExistingText} ${normalizedNextText}`;
    }

    /**
     * Restarts a manual session the browser ended after a speech pause.
     *
     * @param recognition Engine that ended.
     */
    private onRecognitionEnd(recognition: ISpeechRecognition): void {
        if (recognition !== this._recognition) {
            return;
        }

        if (this._mode !== 'manual' || this._stopRequested) {
            this.completeSession();

            return;
        }

        this._finalTranscript = this.joinText(this._finalTranscript, this._interimTranscript);
        this._interimTranscript = '';

        queueMicrotask(() => {
            if (recognition === this._recognition && !this._stopRequested) {
                this.startRecognition(recognition);
            }
        });
    }

    /**
     * Ends the session on a recognition failure, tolerating the silence of a manual session.
     *
     * @param recognition Engine that failed.
     * @param event Browser failure event.
     */
    private onRecognitionError(recognition: ISpeechRecognition, event: SpeechRecognitionErrorEvent): void {
        if (recognition !== this._recognition) {
            return;
        }

        if (this._mode === 'manual' && !this._stopRequested && event.error === 'no-speech') {
            return;
        }

        this.completeSession(new Error(event.error));
    }

    /**
     * Collects one recognition result and ends a single-shot session.
     *
     * @param recognition Engine that produced the result.
     * @param event Browser recognition event.
     */
    private onRecognitionResult(recognition: ISpeechRecognition, event: SpeechRecognitionEvent): void {
        if (recognition !== this._recognition) {
            return;
        }

        this.collectTranscript(event);
        this._onTranscript?.(this.joinText(this._finalTranscript, this._interimTranscript));

        if (this._mode === 'single') {
            this._stopRequested = true;

            try {
                recognition.stop();
            } catch {
                /** The single-shot result is already complete. */
            }

            this.completeSession();
        }
    }

    /**
     * Probes the on-device dictation language pack and requests its download when necessary.
     *
     * @param recognitionConstructor Resolved recognition constructor.
     * @returns `true` when recognition can run on the device.
     */
    private async prepareLocalDictation(recognitionConstructor: ISpeechRecognitionConstructor): Promise<boolean> {
        if (!recognitionConstructor.available) {
            return false;
        }

        const options: ISpeechRecognitionOptions = {
            langs: [this._language],
            processLocally: true,
            quality: 'dictation',
        };

        try {
            const availability = await recognitionConstructor.available(options);

            if (availability === 'available') {
                return true;
            }

            if ((availability === 'downloadable' || availability === 'downloading') && recognitionConstructor.install) {
                void recognitionConstructor.install(options).catch(() => false);
            }
        } catch {
            /** Local recognition is an enhancement; browser recognition remains available. */
        }

        return false;
    }

    /**
     * Reads and clears the transcript of the last completed session.
     *
     * @returns The recognized text.
     */
    private readCompletedTranscript(): string {
        const error = this._completedError;

        this._completedError = null;

        if (error) {
            throw error;
        }

        return this._completedTranscript;
    }

    private readOutcome(outcome: IRecognitionOutcome): string {
        if (outcome.error) {
            if (this._completedError === outcome.error) {
                this._completedError = null;
            }

            throw outcome.error;
        }

        return outcome.transcript;
    }

    /**
     * Resolves the recognition constructor of the injected document.
     *
     * @returns The recognition constructor, if supported.
     */
    private findRecognitionConstructor(): ISpeechRecognitionConstructor | undefined {
        const view = this._document.defaultView as ISpeechRecognitionWindow | null;
        return view?.SpeechRecognition ?? view?.webkitSpeechRecognition;
    }

    /**
     * Starts the engine on the authorized microphone track when one is still live.
     *
     * @param recognition Engine to start.
     * @returns The start failure, or `null` on success.
     */
    private startRecognition(recognition: ISpeechRecognition): Error | null {
        try {
            const audioTrack = this._audioTrack;

            if (audioTrack?.readyState === 'live') {
                recognition.start(audioTrack);
            } else {
                recognition.start();
            }

            return null;
        } catch (error: unknown) {
            const recognitionError = this.toError(error);

            this.completeSession(recognitionError);

            return recognitionError;
        }
    }

    /**
     * Normalizes an unknown browser failure.
     *
     * @param error Unknown failure.
     * @returns The failure as an error.
     */
    private toError(error: unknown): Error {
        return error instanceof Error ? error : new Error(String(error));
    }

    // #endregion
}
