// #region Imports

import { DestroyRef, Directive, inject } from '@angular/core';
import { DIALOG_REF, type IDialogRef } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

const DIALOG_STYLE_PROPERTIES = {
    '--dialog-background-color': 'transparent',
    '--dialog-border-width': '0',
    '--dialog-shadow': 'none',
} as const;

/**
 * Makes the owning Mosaik dialog an invisible interaction host for the full-screen preview.
 *
 * @public
 */
@Directive({
    selector: '[ngpImagePreviewDialogSurface]',
})
export class ImagePreviewDialogSurfaceDirective {
    // #region Fields

    private readonly _destroyRef = inject(DestroyRef);
    private readonly _dialogRef = inject(DIALOG_REF) as IDialogRef;
    private readonly _previousValues = new Map<string, string>();

    // #endregion

    // #region Ctor

    /**
     * Constructs the dialog surface integration.
     *
     * @public
     */
    public constructor() {
        const dialogStyle = this._dialogRef.element.style;
        for (const [property, value] of Object.entries(DIALOG_STYLE_PROPERTIES)) {
            this._previousValues.set(property, dialogStyle.getPropertyValue(property));
            dialogStyle.setProperty(property, value);
        }

        this._destroyRef.onDestroy(() => {
            for (const [property, value] of this._previousValues) {
                if (value) {
                    dialogStyle.setProperty(property, value);
                } else {
                    dialogStyle.removeProperty(property);
                }
            }
        });
    }

    // #endregion
}
