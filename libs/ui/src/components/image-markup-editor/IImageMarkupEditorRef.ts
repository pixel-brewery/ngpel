// #region Imports

import type { ICancel, IDialogRef } from '@pixel-brewery/mosaik-elements-angular';
import type { Observable } from 'rxjs';

// #endregion

/**
 * Public handle for observing and visually integrating an open image markup editor.
 *
 * @public
 */
export interface IImageMarkupEditorRef {
    // #region Properties

    /**
     * Emits the positive edited image or a negative dismissal.
     *
     * @public
     * @readonly
     */
    readonly closed: Observable<ICancel<File>>;

    /**
     * Underlying overlay used for application-level stacking integration.
     *
     * @public
     * @readonly
     */
    readonly overlayRef: IDialogRef['overlayRef'];

    // #endregion
}
