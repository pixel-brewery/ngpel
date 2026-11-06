/**
 * The audio the {@link AudioPlayer} attaches to its element: a URL, a retained blob, or an
 * externally owned live media stream. Ownership of a stream stays with the caller — the player
 * detaches it but never stops its tracks.
 *
 * @public
 */
export interface IAudioSource {
    // #region Properties

    /**
     * URL, retained blob, or externally owned live media stream.
     */
    readonly src: string | Blob | MediaStream;

    /**
     * Friendly name for diagnostics and logging.
     */
    readonly label?: string | null;

    // #endregion
}
