// #region Imports

import { afterNextRender, Directive, inject } from '@angular/core';
import { SheetComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Opens a declaratively rendered sheet as soon as its Mosaik element has connected.
 *
 * Render the sheet conditionally and let this directive run the regular open lifecycle,
 * so snap measurement, modal focus handling and the close-attempt contract behave exactly
 * as for a sheet opened through the service.
 *
 * @public
 */
@Directive({
    selector: 'mosaik-sheet[ngpSheetAutoOpen]',
})
export class SheetAutoOpenDirective {
    // #region Fields

    private readonly _sheet = inject(SheetComponent);

    // #endregion

    // #region Ctor

    /**
     * Constructs the directive and schedules the open call after the first render.
     *
     * @public
     */
    public constructor() {
        afterNextRender(() => {
            const element = this._sheet.elementRef.nativeElement;

            void element.updateComplete.then(() => this._sheet.invoke('open'));
        });
    }

    // #endregion

    // #region Properties
    // #endregion

    // #region Methods
    // #endregion
}
