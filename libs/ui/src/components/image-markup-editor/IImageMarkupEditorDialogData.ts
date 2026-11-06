// #region Imports

import type { IImageMarkupEditorLabels } from './IImageMarkupEditorLabels';

// #endregion

/**
 * Resolved data supplied to the generic image markup dialog.
 *
 * @internal
 */
export interface IImageMarkupEditorDialogData {
    // #region Properties

    readonly labels: IImageMarkupEditorLabels;
    readonly previewUrl: string;
    readonly outputFileName: string;
    readonly maximumSourcePixels: number;
    readonly historyLimit: number;

    // #endregion
}
