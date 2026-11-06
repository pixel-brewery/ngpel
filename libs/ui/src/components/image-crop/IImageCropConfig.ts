// #region Imports

import type { IImageCropLabels } from './IImageCropLabels';

// #endregion

/**
 * Optional behavior and presentation overrides for an image crop dialog.
 *
 * @public
 */
export interface IImageCropConfig {
    // #region Properties

    /**
     * User-visible text overrides.
     *
     * @public
     * @readonly
     */
    readonly labels?: Partial<IImageCropLabels>;

    /**
     * Minimum accepted width and height in rendered pixels.
     *
     * @public
     * @readonly
     */
    readonly minimumSelectionSize?: number;

    /**
     * File name assigned to the resulting PNG image.
     *
     * @public
     * @readonly
     */
    readonly outputFileName?: string;

    // #endregion
}
