/**
 * Describes an image or video rendered by the preview.
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

    /** Optional WebVTT captions for video playback. */
    readonly captions?: {
        readonly src: string;
        readonly language: string;
        readonly label: string;
    } | null;

    /**
     * Intrinsic or preferred image height.
     *
     * @public
     * @readonly
     */
    readonly height?: number | string;

    /** Type of media to render. Defaults to an image. */
    readonly mediaKind?: 'image' | 'video';

    /** Optional still image shown before a video starts. */
    readonly poster?: string | null;

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
