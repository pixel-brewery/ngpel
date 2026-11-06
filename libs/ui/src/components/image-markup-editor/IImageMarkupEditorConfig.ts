// #region Imports

import type { IImageMarkupEditorLabels } from './IImageMarkupEditorLabels';

// #endregion

/**
 * Optional behavior and presentation overrides for the generic image markup editor.
 *
 * @public
 */
export interface IImageMarkupEditorConfig {
    // #region Properties

    /**
     * User-visible text overrides.
     *
     * @public
     * @readonly
     */
    readonly labels?: Partial<IImageMarkupEditorLabels>;

    /**
     * File name assigned to the resulting PNG image.
     *
     * @public
     * @readonly
     */
    readonly outputFileName?: string;

    /**
     * Maximum accepted source-image pixel count.
     *
     * @public
     * @readonly
     */
    readonly maximumSourcePixels?: number;

    /**
     * Maximum undo history depth.
     *
     * @public
     * @readonly
     */
    readonly historyLimit?: number;

    // #endregion
}
