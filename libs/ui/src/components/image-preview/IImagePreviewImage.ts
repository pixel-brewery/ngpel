/**
 * Describes an image rendered by the image preview.
 *
 * @public
 */
export interface IImagePreviewImage {
    /**
     * Accessible alternative text for the image.
     *
     * @public
     * @readonly
     */
    readonly alt?: string;

    /**
     * Intrinsic or preferred image height.
     *
     * @public
     * @readonly
     */
    readonly height?: number | string;

    /**
     * Image source URL.
     *
     * @public
     * @readonly
     */
    readonly src: string;

    /**
     * Optional responsive image source set.
     *
     * @public
     * @readonly
     */
    readonly srcset?: string;

    /**
     * Intrinsic or preferred image width.
     *
     * @public
     * @readonly
     */
    readonly width?: number | string;
}
