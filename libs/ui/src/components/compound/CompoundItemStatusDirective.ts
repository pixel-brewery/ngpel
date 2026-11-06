// #region Imports

import { Directive, inject, TemplateRef } from '@angular/core';
import type { ICompoundItemContext } from './ICompoundItemContext';

// #endregion

/** Projects status alongside a stacked compound item's heading. @public */
@Directive({ selector: 'ng-template[ngpCompoundItemStatus]' })
export class CompoundItemStatusDirective<T> {
    // #region Properties

    /** The template rendered with the item's context. */
    public readonly templateRef = inject<TemplateRef<ICompoundItemContext<T>>>(TemplateRef);

    // #endregion

    // #region Methods

    /** Supplies the item context to Angular's template type checker. */
    public static ngTemplateContextGuard<T>(directive: CompoundItemStatusDirective<T>, context: unknown): context is ICompoundItemContext<T> {
        return Boolean(directive) && Boolean(context);
    }

    // #endregion
}
