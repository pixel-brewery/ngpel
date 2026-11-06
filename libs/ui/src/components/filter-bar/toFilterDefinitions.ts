// #region Imports

import type { IFilterColumnBinding, IFilterDefinition } from './IFilterDefinition';

// #endregion

/**
 * Builds filter definitions by resolving {@link IFilterColumnBinding} entries
 * against column definitions. The column's `title` is used as the filter label.
 *
 * Bindings whose `columnKey` does not match any column are silently skipped.
 *
 * @typeParam T - The entity type whose keys constrain the allowed filter bindings.
 * @param columns  - The column definitions array (must have `key` and `title`).
 * @param bindings - Filter bindings that reference columns by key.
 * @returns An array of filter definitions ready for the FilterBarComponent.
 *
 * @example
 * ```typescript
 * const filters = buildFilterDefinitions<ICustomerResponse>(this._columnDefinitions, [
 *     { columnKey: 'firstName', type: 'text' },
 *     { columnKey: 'status',    type: 'select', options: [...] },
 * ]);
 * ```
 *
 * @public
 */
export function buildFilterDefinitions<T>(
    columns: ReadonlyArray<{ key: string; title?: string }>,
    bindings: ReadonlyArray<IFilterColumnBinding<T>>,
): ReadonlyArray<IFilterDefinition> {
    const columnMap = new Map(columns.map((col) => [col.key, col]));

    return bindings
        .filter((binding) => columnMap.has(binding.columnKey))
        .map((binding) => {
            const column = columnMap.get(binding.columnKey)!;

            return {
                key: binding.columnKey,
                label: column.title ?? binding.columnKey,
                type: binding.type,
                placeholder: binding.placeholder,
                options: binding.options,
            };
        });
}
