/**
 * Immutable crop rectangle expressed in source-image pixels.
 *
 * @public
 */
export interface IImageMarkupCropSelection {
    // #region Properties

    /** Horizontal offset from the source-image left edge. */
    readonly left: number;
    /** Vertical offset from the source-image top edge. */
    readonly top: number;
    /** Selected source-image width. */
    readonly width: number;
    /** Selected source-image height. */
    readonly height: number;

    // #endregion
}
