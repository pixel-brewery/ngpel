/** Identifies the exact bytes and load generation owned by a preview renderer. @internal */
export interface IDocumentPreviewRenderAttempt {
    readonly blob: Blob;
    readonly sequence: number;
}
