// #region Imports

import type { IImageCropLabels } from './IImageCropLabels';

// #endregion

/**
 * Fully resolved data supplied to an image crop dialog.
 *
 * @internal
 */
export interface IImageCropDialogData {
    // #region Properties

    /**
     * Resolved user-visible labels.
     *
     * @internal
     * @readonly
     */
    readonly labels: IImageCropLabels;

    /**
     * Minimum accepted width and height in rendered pixels.
     *
     * @internal
     * @readonly
     */
    readonly minimumSelectionSize: number;

    /**
     * File name assigned to the resulting PNG image.
     *
     * @internal
     * @readonly
     */
    readonly outputFileName: string;

    /**
     * Temporary browser URL used to render the source image.
     *
     * @internal
     * @readonly
     */
    readonly previewUrl: string;

    // #endregion
}
