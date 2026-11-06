// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import type { ILiveVoiceTranscriber } from './ILiveVoiceTranscriber';
import type { ILocalVoiceTranscriberOptions } from './ILocalVoiceTranscriberOptions';
import type { ITranscriptionInput } from './ITranscriptionInput';
import { LOCAL_VOICE_TRANSCRIBER_OPTIONS } from './LOCAL_VOICE_TRANSCRIBER_OPTIONS';

// #endregion

/**
 * How a recognition session ends: `manual` sessions run until the user stops them, `single`
 * sessions end with the first result.
 */
type RecognitionMode = 'manual' | 'single';

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
    private _resolveSession: ((transcript: string) => void) | null = null;
    private _sessionPromise: Promise<string> | null = null;
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
    public startSession(audioTrack?: MediaStreamTrack): Promise<void> {
        return this.beginRecognition('manual', audioTrack);
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

        await sessionPromise;

        return this.readCompletedTranscript();
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
        this._stopRequested = true;

        if (recognition) {
            try {
                recognition.abort();
            } catch {
                /** The recognition engine already ended and is cleaned up below. */
            }
        }

        this.completeSession();
        this._completedTranscript = '';
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
        await this.beginRecognition('single');
        await this._sessionPromise;

        return this.readCompletedTranscript();
    }

    /**
     * Starts a recognition session in the requested mode.
     *
     * @param mode Session lifetime.
     * @param audioTrack Already authorized live microphone track.
     */
    private async beginRecognition(mode: RecognitionMode, audioTrack?: MediaStreamTrack): Promise<void> {
        if (this._sessionPromise) {
            throw new Error('A speech recognition session is already active.');
        }

        const recognitionConstructor = this.resolveRecognitionConstructor();

        this._completedError = null;
        this._completedTranscript = '';
        this._finalTranscript = '';
        this._interimTranscript = '';
        this._mode = mode;
        this._audioTrack = audioTrack ?? null;
        this._recognition = null;
        this._stopRequested = false;
        this._sessionPromise = new Promise<string>((resolve) => {
            this._resolveSession = resolve;
        });

        const sessionPromise = this._sessionPromise;
        const processLocally = await this.prepareLocalDictation(recognitionConstructor);

        if (sessionPromise !== this._sessionPromise) {
            return;
        }

        const recognition = new recognitionConstructor();

        recognition.continuous = mode === 'manual';
        recognition.interimResults = mode === 'manual' ? true : this._interimResults;
        recognition.lang = this._language;
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
        this._stopRequested = false;
        resolve?.(this._completedTranscript);
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

        if (this._mode === 'single' || this._stopRequested) {
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

    /**
     * Resolves the recognition constructor of the injected document.
     *
     * @returns The recognition constructor.
     * @throws Error when the browser has no speech recognition.
     */
    private resolveRecognitionConstructor(): ISpeechRecognitionConstructor {
        const view = this._document.defaultView as ISpeechRecognitionWindow | null;
        const recognitionConstructor = view?.SpeechRecognition ?? view?.webkitSpeechRecognition;

        if (!recognitionConstructor) {
            throw new Error('SpeechRecognition API not supported in this browser.');
        }

        return recognitionConstructor;
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
