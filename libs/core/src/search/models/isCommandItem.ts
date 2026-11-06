// #region Imports

import type { ICommandItem } from './ICommandItem';

// #endregion

/**
 * Narrows a search surface item to an executable command. A command is recognised by its
 * `execute()` method, which no search result carries.
 *
 * @public
 * @param value The value to test.
 * @returns `true` when the value is an {@link ICommandItem}.
 */
export function isCommandItem(value: unknown): value is ICommandItem {
    if (value === null || typeof value !== 'object') {
        return false;
    }

    const candidate = value as Partial<ICommandItem>;

    return typeof candidate.id === 'string' && typeof candidate.label === 'string' && typeof candidate.execute === 'function';
}
