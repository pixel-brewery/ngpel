/**
 * One ordered audio fragment emitted while recording is still active.
 *
 * @public
 */
export interface IAudioRecorderChunk {
    // #region Properties

    /**
     * Encoded audio payload for immediate persistence or transport.
     */
    readonly blob: Blob;

    /**
     * Active recording duration when the chunk became available.
     */
    readonly elapsedMs: number;

    /**
     * Effective encoded MIME type of this chunk.
     */
    readonly mimeType: string;

    /**
     * Zero-based sequence number within the current recording.
     */
    readonly sequence: number;

    /**
     * Browser-provided media timecode, or `null` when the browser omits it.
     */
    readonly timecodeMs: number | null;

    // #endregion
}
