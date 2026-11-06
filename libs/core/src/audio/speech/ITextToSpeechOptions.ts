/**
 * Options of one speech synthesis utterance. Every option is optional and falls back to the
 * browser default of the selected voice.
 *
 * @public
 */
export interface ITextToSpeechOptions {
    // #region Properties

    /**
     * BCP 47 language code, for example `'en-US'` or `'de-DE'`.
     */
    readonly lang?: string;

    /**
     * Speaking rate between `0.1` and `10`; values outside are clamped.
     */
    readonly rate?: number;

    /**
     * Pitch between `0` and `2`; values outside are clamped.
     */
    readonly pitch?: number;

    /**
     * Volume between `0` and `1`; values outside are clamped.
     */
    readonly volume?: number;

    /**
     * Name of the voice to speak with, as reported by the browser voice list. An unknown name
     * keeps the browser default voice.
     */
    readonly voiceName?: string;

    // #endregion
}
