import { ContentChildren, Directive, QueryList } from '@angular/core';
import { DropDownButtonComponent } from '@pixel-brewery/mosaik-elements-angular';

/** Closes contextual menus before a collection row executes its primary action. */
@Directive({
    selector: '[ngpCloseDescendantMenus]',
    exportAs: 'ngpCloseDescendantMenus',
})
export class CloseDescendantMenusDirective {
    // #region Fields

    @ContentChildren(DropDownButtonComponent, { descendants: true })
    private readonly _menus?: QueryList<DropDownButtonComponent>;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods

    public close(): void {
        this._menus?.forEach((menu) => menu.invoke('close'));
    }

    // #endregion
}
