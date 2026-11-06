/**
 * User-visible labels rendered by the image crop dialog.
 *
 * @public
 */
export interface IImageCropLabels {
    // #region Properties

    /**
     * Primary dialog heading.
     *
     * @public
     * @readonly
     */
    readonly title: string;

    /**
     * Short selection instruction.
     *
     * @public
     * @readonly
     */
    readonly description: string;

    /**
     * Accessible alternative text for the source image.
     *
     * @public
     * @readonly
     */
    readonly imageAlternativeText: string;

    /**
     * Label for the dismiss action.
     *
     * @public
     * @readonly
     */
    readonly cancel: string;

    /**
     * Label for the crop confirmation action.
     *
     * @public
     * @readonly
     */
    readonly apply: string;

    /**
     * Message shown when the selected image region cannot be encoded.
     *
     * @public
     * @readonly
     */
    readonly cropError: string;

    // #endregion
}
