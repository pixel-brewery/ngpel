// #region Imports

import { DestroyRef, DOCUMENT, inject, Injectable, type Signal, signal } from '@angular/core';
import type { ITextToSpeechOptions } from './ITextToSpeechOptions';

// #endregion

const MAXIMUM_PITCH = 2;
const MAXIMUM_RATE = 10;
const MAXIMUM_VOLUME = 1;
const MINIMUM_PITCH = 0;
const MINIMUM_RATE = 0.1;
const MINIMUM_VOLUME = 0;

/**
 * Reads text aloud through the Web Speech API.
 *
 * The synthesizer is reached through the injected `DOCUMENT`, and the voice list is followed with
 * an event listener rather than by assigning `speechSynthesis.onvoiceschanged`, so the service
 * never silences another listener on the page. Speech and listener stop when the owning injector
 * is destroyed. Outside a browser the service stays inert and reports `isSupported()` as `false`.
 *
 * @public
 */
@Injectable()
export class TextToSpeechService {
    // #region Fields

    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _document: Document = inject(DOCUMENT);
    private readonly _error = signal<string | null>(null);
    private readonly _isPaused = signal<boolean>(false);
    private readonly _isSpeaking = signal<boolean>(false);
    private readonly _isSupported = signal<boolean>(false);
    private readonly _voices = signal<ReadonlyArray<SpeechSynthesisVoice>>([]);
    private _voicesAbortController: AbortController | null = null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `TextToSpeechService` class and starts following the
     * browser voice list, which several browsers publish asynchronously.
     *
     * @public
     */
    public constructor() {
        const synthesis = this.resolveSynthesis();

        this._isSupported.set(synthesis !== null);

        if (synthesis) {
            this._voicesAbortController = new AbortController();
            synthesis.addEventListener('voiceschanged', () => this.loadVoices(), {
                signal: this._voicesAbortController.signal,
            });
            this.loadVoices();
        }

        this._destroyRef.onDestroy(() => this.dispose());
    }

    // #endregion

    // #region Properties

    /**
     * Last synthesis failure message.
     *
     * @public
     * @readonly
     */
    public get error(): Signal<string | null> {
        return this._error.asReadonly();
    }

    /**
     * Indicates whether synthesis is paused.
     *
     * @public
     * @readonly
     */
    public get isPaused(): Signal<boolean> {
        return this._isPaused.asReadonly();
    }

    /**
     * Indicates whether text is currently being spoken.
     *
     * @public
     * @readonly
     */
    public get isSpeaking(): Signal<boolean> {
        return this._isSpeaking.asReadonly();
    }

    /**
     * Indicates whether the browser supports speech synthesis.
     *
     * @public
     * @readonly
     */
    public get isSupported(): Signal<boolean> {
        return this._isSupported.asReadonly();
    }

    /**
     * Voices the browser currently offers.
     *
     * @public
     * @readonly
     */
    public get voices(): Signal<ReadonlyArray<SpeechSynthesisVoice>> {
        return this._voices.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Speaks the given text, replacing any utterance that is still running.
     *
     * @public
     * @param text The text to speak.
     * @param options Language, rate, pitch, volume, and voice of this utterance.
     * @returns A promise that resolves when the utterance finished or was interrupted.
     * @throws Error when the browser cannot synthesize speech or the utterance failed.
     */
    public speak(text: string, options?: ITextToSpeechOptions | null): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const synthesis = this.resolveSynthesis();
            const utteranceConstructor = this._document.defaultView?.SpeechSynthesisUtterance;

            if (!synthesis || !utteranceConstructor) {
                const errorMessage = 'Text-to-speech is not supported in this browser.';

                this._error.set(errorMessage);
                reject(new Error(errorMessage));

                return;
            }

            this.stop();
            this._error.set(null);

            const utterance = new utteranceConstructor(text);

            this.applyOptions(utterance, options);

            utterance.onstart = (): void => {
                this._isSpeaking.set(true);
                this._isPaused.set(false);
            };
            utterance.onend = (): void => {
                this.markStopped();
                resolve();
            };
            utterance.onerror = (event: SpeechSynthesisErrorEvent): void => {
                this.markStopped();

                /** An interrupted or cancelled utterance is a caller decision, not a failure. */
                if (event.error === 'interrupted' || event.error === 'canceled') {
                    resolve();

                    return;
                }

                const errorMessage = `Speech synthesis error: ${event.error}`;

                this._error.set(errorMessage);
                reject(new Error(errorMessage));
            };
            utterance.onpause = (): void => {
                this._isPaused.set(true);
            };
            utterance.onresume = (): void => {
                this._isPaused.set(false);
            };

            synthesis.speak(utterance);
        });
    }

    /**
     * Pauses the running utterance.
     *
     * @public
     */
    public pause(): void {
        if (this._isSpeaking()) {
            this.resolveSynthesis()?.pause();
        }
    }

    /**
     * Resumes a paused utterance.
     *
     * @public
     */
    public resume(): void {
        if (this._isPaused()) {
            this.resolveSynthesis()?.resume();
        }
    }

    /**
     * Stops all speech synthesis of this browser context.
     *
     * @public
     */
    public stop(): void {
        const synthesis = this.resolveSynthesis();

        if (!synthesis) {
            return;
        }

        synthesis.cancel();
        this.markStopped();
    }

    /**
     * Stops when speech is running and speaks the given text otherwise, which is the behaviour a
     * single read-aloud button needs.
     *
     * @public
     * @param text The text to speak while nothing is spoken.
     * @param options Language, rate, pitch, volume, and voice of this utterance.
     * @returns A promise that resolves once the action completed.
     * @throws Error when the browser cannot synthesize speech or the utterance failed.
     */
    public async toggle(text: string, options?: ITextToSpeechOptions | null): Promise<void> {
        if (this._isSpeaking()) {
            this.stop();

            return;
        }

        await this.speak(text, options);
    }

    /**
     * Returns the voices of one language.
     *
     * @public
     * @param lang BCP 47 language code or its leading subtag, for example `'de'` or `'de-DE'`.
     * @returns The matching voices, in the order the browser reports them.
     */
    public getVoicesForLanguage(lang: string): ReadonlyArray<SpeechSynthesisVoice> {
        const normalizedLang = lang.toLowerCase();

        return this._voices().filter((voice) => voice.lang.toLowerCase().startsWith(normalizedLang));
    }

    /**
     * Stops speech and the voice-list subscription.
     *
     * @public
     */
    public dispose(): void {
        this.stop();
        this._voicesAbortController?.abort();
        this._voicesAbortController = null;
    }

    /**
     * Applies the caller options to an utterance, clamping every numeric range.
     *
     * @param utterance Utterance to configure.
     * @param options Caller options.
     */
    private applyOptions(utterance: SpeechSynthesisUtterance, options?: ITextToSpeechOptions | null): void {
        if (!options) {
            return;
        }

        if (options.lang) {
            utterance.lang = options.lang;
        }

        if (options.rate !== null && options.rate !== undefined) {
            utterance.rate = Math.max(MINIMUM_RATE, Math.min(MAXIMUM_RATE, options.rate));
        }

        if (options.pitch !== null && options.pitch !== undefined) {
            utterance.pitch = Math.max(MINIMUM_PITCH, Math.min(MAXIMUM_PITCH, options.pitch));
        }

        if (options.volume !== null && options.volume !== undefined) {
            utterance.volume = Math.max(MINIMUM_VOLUME, Math.min(MAXIMUM_VOLUME, options.volume));
        }

        if (options.voiceName) {
            const voice = this._voices().find((candidate) => candidate.name === options.voiceName);

            if (voice) {
                utterance.voice = voice;
            }
        }
    }

    /**
     * Publishes the voices the browser currently offers.
     */
    private loadVoices(): void {
        this._voices.set(this.resolveSynthesis()?.getVoices() ?? []);
    }

    /**
     * Publishes the state of a finished, interrupted, or cancelled utterance.
     */
    private markStopped(): void {
        this._isSpeaking.set(false);
        this._isPaused.set(false);
    }

    /**
     * Resolves the speech synthesizer of the injected document.
     *
     * @returns The synthesizer, or `null` outside a browser window.
     */
    private resolveSynthesis(): SpeechSynthesis | null {
        return this._document.defaultView?.speechSynthesis ?? null;
    }

    // #endregion
}
