/**
 * Two-dimensional point in rendered-image coordinates.
 *
 * @public
 */
export interface IImageCropPoint {
    // #region Properties

    /**
     * Horizontal coordinate.
     *
     * @public
     * @readonly
     */
    readonly x: number;

    /**
     * Vertical coordinate.
     *
     * @public
     * @readonly
     */
    readonly y: number;

    // #endregion
}
