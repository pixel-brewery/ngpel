// #region Imports

import { Directive, inject, TemplateRef } from '@angular/core';

// #endregion

/**
 * Marks a consumer-owned template rendered when a compound collection is empty.
 *
 * @public
 */
@Directive({
    selector: 'ng-template[ngpCompoundEmpty]',
})
export class CompoundEmptyDirective {
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
