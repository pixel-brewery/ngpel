// #region Imports

import { Directive, inject, TemplateRef } from '@angular/core';
import type { ICompoundItemContext } from './ICompoundItemContext';

// #endregion

/** Projects the heading of each stacked compound item. @public */
@Directive({ selector: 'ng-template[ngpCompoundItemSummary]' })
export class CompoundItemSummaryDirective<T> {
    // #region Properties

    /** The template rendered with the item's context. */
    public readonly templateRef = inject<TemplateRef<ICompoundItemContext<T>>>(TemplateRef);

    // #endregion

    // #region Methods

    /** Supplies the item context to Angular's template type checker. */
    public static ngTemplateContextGuard<T>(directive: CompoundItemSummaryDirective<T>, context: unknown): context is ICompoundItemContext<T> {
        return Boolean(directive) && Boolean(context);
    }

    // #endregion
}
