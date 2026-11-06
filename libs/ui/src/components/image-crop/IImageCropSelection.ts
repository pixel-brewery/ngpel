/**
 * Pixel-based rectangle selected on a rendered image.
 *
 * @public
 */
export interface IImageCropSelection {
    // #region Properties

    /**
     * Horizontal offset from the rendered image's left edge.
     *
     * @public
     * @readonly
     */
    readonly left: number;

    /**
     * Vertical offset from the rendered image's top edge.
     *
     * @public
     * @readonly
     */
    readonly top: number;

    /**
     * Selected width in rendered pixels.
     *
     * @public
     * @readonly
     */
    readonly width: number;

    /**
     * Selected height in rendered pixels.
     *
     * @public
     * @readonly
     */
    readonly height: number;

    // #endregion
}
