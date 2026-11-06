// #region Imports

import { Directive, TemplateRef, inject } from '@angular/core';
import type { IActionStripContentContext } from './IActionStripContentContext';

// #endregion

/**
 * Marks the declarative HTML template rendered inside an action strip.
 *
 * @typeParam T - Context value resolved by the action-strip trigger.
 * @public
 */
@Directive({ selector: 'ng-template[ngpActionStripContent]' })
export class ActionStripContentDirective<T = unknown> {
    // #region Fields

    /** Template rendered with the active item as its implicit value. */
    public readonly templateRef: TemplateRef<IActionStripContentContext<T>> = inject(TemplateRef);

    // #endregion

    // #region Methods

    /**
     * Narrows the Angular template context to the action-strip contract.
     *
     * @param directive - Directive instance whose generic type is checked.
     * @param context - Template context to narrow.
     * @returns Whether the context is an action-strip template context.
     * @typeParam TContext - Context value resolved by the trigger.
     * @public
     * @static
     */
    public static ngTemplateContextGuard<TContext>(
        directive: ActionStripContentDirective<TContext>,
        context: unknown,
    ): context is IActionStripContentContext<TContext> {
        return Boolean(directive) && typeof context === 'object' && context !== null;
    }

    // #endregion
}
