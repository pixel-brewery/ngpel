/**
 * Configuration of the browser-based {@link LocalVoiceTranscriber}.
 *
 * @public
 */
export interface ILocalVoiceTranscriberOptions {
    // #region Properties

    /**
     * BCP 47 recognition language, for example `'en-US'` or `'de-DE'`. Defaults to `'en-US'`.
     */
    readonly language?: string;

    /**
     * Whether single-shot recognition also reports interim results. Live sessions always use
     * interim results because they join them into the running transcript. Defaults to `false`.
     */
    readonly interimResults?: boolean;

    /**
     * Number of alternatives the engine reports per result. Defaults to `1`.
     */
    readonly maxAlternatives?: number;

    // #endregion
}
