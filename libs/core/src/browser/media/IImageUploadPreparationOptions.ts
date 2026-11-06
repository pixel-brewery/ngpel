/**
 * Bounds an upload and sets the dimensions used when the image needs re-encoding.
 *
 * @public
 */
export interface IImageUploadPreparationOptions {
    readonly maximumFileSizeInBytes: number;
    readonly maximumWidthInPixels: number;
    readonly maximumHeightInPixels: number;
}
