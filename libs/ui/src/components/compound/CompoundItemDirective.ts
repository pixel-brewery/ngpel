// #region Imports

import { Directive, inject, TemplateRef } from '@angular/core';
import type { ICompoundItemContext } from './ICompoundItemContext';

// #endregion

/**
 * Marks the template used to render the active item of a compound collection.
 *
 * @typeParam T - Collection item type supplied by the consumer.
 * @public
 */
@Directive({
    selector: 'ng-template[ngpCompoundItem]',
})
export class CompoundItemDirective<T> {
    // #region Properties

    /**
     * Template reference rendered by the owning compound component.
     *
     * @public
     * @readonly
     */
    public readonly templateRef = inject<TemplateRef<ICompoundItemContext<T>>>(TemplateRef);

    // #endregion

    // #region Methods

    /**
     * Describes the template context exposed to Angular template type checking.
     *
     * @param directive - Directive instance whose generic item type is checked.
     * @param context - Template context to narrow.
     * @returns Whether the context matches the compound item contract.
     * @public
     * @static
     */
    public static ngTemplateContextGuard<T>(directive: CompoundItemDirective<T>, context: unknown): context is ICompoundItemContext<T> {
        return Boolean(directive) && Boolean(context);
    }

    // #endregion
}
