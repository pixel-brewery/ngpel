/**
 * Point in source-image pixel coordinates.
 *
 * @public
 */
export interface IImageMarkupPoint {
    // #region Properties

    /**
     * Horizontal source-image coordinate.
     *
     * @public
     * @readonly
     */
    readonly x: number;

    /**
     * Vertical source-image coordinate.
     *
     * @public
     * @readonly
     */
    readonly y: number;

    // #endregion
}
