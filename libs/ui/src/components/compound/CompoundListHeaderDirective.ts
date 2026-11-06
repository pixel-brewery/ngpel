// #region Imports

import { Directive, inject, TemplateRef } from '@angular/core';

// #endregion

/**
 * Marks an optional consumer-owned header template for the compound list view.
 *
 * @public
 */
@Directive({
    selector: 'ng-template[ngpCompoundListHeader]',
})
export class CompoundListHeaderDirective {
    // #region Fields

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /**
     * Template reference rendered in the Mosaik list header slot.
     *
     * @public
     * @readonly
     */
    public readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);

    // #endregion

    // #region Methods

    // #endregion
}
