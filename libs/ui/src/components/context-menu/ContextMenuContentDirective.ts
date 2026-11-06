// #region Imports

import { Directive, TemplateRef, inject, input } from '@angular/core';
import type { IContextMenuContentContext } from './IContextMenuContentContext';

// #endregion

/**
 * Marks the declarative HTML template rendered inside a context menu.
 *
 * @typeParam T - Context value resolved by the menu trigger.
 * @public
 */
@Directive({ selector: 'ng-template[ngpContextMenuContent]' })
export class ContextMenuContentDirective<T = unknown> {
    // #region Fields

    /**
     * Template rendered with the active item as its implicit value.
     */
    public readonly templateRef: TemplateRef<IContextMenuContentContext<T>> = inject(TemplateRef);

    // #endregion

    // #region Properties

    /** Optionally binds a collection so Angular can infer the type of the implicit item. */
    public readonly items = input<ReadonlyArray<T> | ''>('', { alias: 'ngpContextMenuContent' });

    // #endregion

    // #region Methods

    /**
     * Narrows the Angular template context to the context-menu contract.
     *
     * @param directive - Directive instance whose generic type is checked.
     * @param context - Template context to narrow.
     * @returns Whether the context is a context-menu template context.
     * @typeParam TContext - Context value resolved by the menu trigger.
     * @public
     * @static
     */
    public static ngTemplateContextGuard<TContext>(
        directive: ContextMenuContentDirective<TContext>,
        context: unknown,
    ): context is IContextMenuContentContext<TContext> {
        return Boolean(directive) && typeof context === 'object' && context !== null;
    }

    // #endregion
}
