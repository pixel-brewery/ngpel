/**
 * Per-call playback options. Every option is optional and keeps the player's current setting when
 * omitted, so a caller can start a sound without restating the whole configuration.
 *
 * @public
 */
export interface IAudioPlayOptions {
    // #region Properties

    /**
     * Volume in the inclusive range from zero to one. Values outside the range are clamped.
     */
    readonly volume?: number | null;

    /**
     * Whether playback repeats. Live streams ignore this option.
     */
    readonly loop?: boolean | null;

    /**
     * Start position of a seekable source in seconds. Live streams ignore this option.
     */
    readonly startAt?: number | null;

    // #endregion
}
