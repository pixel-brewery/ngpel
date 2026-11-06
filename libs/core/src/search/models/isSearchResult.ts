// #region Imports

import { isCommandItem } from './isCommandItem';
import type { ISearchResult } from './ISearchResult';

// #endregion

/**
 * Narrows a search surface item to a semantic search result. Commands are rejected first, so the
 * two guards partition the item union exactly.
 *
 * @public
 * @param value The value to test.
 * @returns `true` when the value is an {@link ISearchResult}.
 */
export function isSearchResult(value: unknown): value is ISearchResult {
    if (value === null || typeof value !== 'object' || isCommandItem(value)) {
        return false;
    }

    const candidate = value as Partial<ISearchResult>;

    return typeof candidate.id === 'string' && typeof candidate.label === 'string';
}
