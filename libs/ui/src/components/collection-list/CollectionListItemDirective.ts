// #region Imports

import { Directive, input, type InputSignal } from '@angular/core';
import type { ICollectionListItemContext } from './ICollectionListItemContext';

// #endregion

/**
 * Marks the caller-provided row template of a collection list.
 *
 * @typeParam T - Collection item type.
 * @public
 */
@Directive({ selector: 'ng-template[ngpCollectionListItem]' })
export class CollectionListItemDirective<T> {
    // #region Fields
    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Collection used to infer the row-template item type.
     *
     * @public
     * @readonly
     */
    public readonly ngpCollectionListItem: InputSignal<ReadonlyArray<T>> = input.required<ReadonlyArray<T>>();

    // #endregion

    // #region Methods

    /**
     * Narrows the Angular template context to the collection item contract.
     *
     * @param directive - Directive instance whose generic item type is checked.
     * @param context - Template context to narrow.
     * @returns Whether the context matches the collection item contract.
     * @typeParam T - Collection item type.
     * @public
     * @static
     */
    public static ngTemplateContextGuard<T>(directive: CollectionListItemDirective<T>, context: unknown): context is ICollectionListItemContext<T> {
        return Boolean(directive) && typeof context === 'object' && context !== null;
    }

    // #endregion
}
