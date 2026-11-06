// #region Imports

import { Directive, inject, TemplateRef } from '@angular/core';

// #endregion

/**
 * Marks a consumer-owned action template rendered beside the compound navigation.
 *
 * @public
 */
@Directive({
    selector: 'ng-template[ngpCompoundActions]',
})
export class CompoundActionsDirective {
    // #region Properties

    /**
     * Template reference rendered by the owning compound component.
     *
     * @public
     * @readonly
     */
    public readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);

    // #endregion
}
