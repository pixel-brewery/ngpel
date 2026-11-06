/**
 * The recorded audio handed to a {@link IVoiceTranscriber}.
 *
 * @public
 */
export interface ITranscriptionInput {
    // #region Properties

    /**
     * Encoded audio payload to transcribe.
     */
    readonly blob: Blob;

    /**
     * File name a remote strategy may attach to its upload.
     */
    readonly filename?: string | null;

    /**
     * Effective MIME type of the payload when it differs from `blob.type`.
     */
    readonly mimeType?: string | null;

    // #endregion
}
