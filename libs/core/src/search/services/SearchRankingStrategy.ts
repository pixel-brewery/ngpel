// #region Imports

import type { ICommandItem } from '../models/ICommandItem';
import type { ISearchResult } from '../models/ISearchResult';

// #endregion

/**
 * Strategy that orders the items of a search surface. It is used as the DI token of the ranking
 * implementation; `provideSearch()` binds it to `DefaultSearchRankingStrategy` and applications
 * override it by providing their own subclass after the composition root.
 *
 * @public
 */
export abstract class SearchRankingStrategy {
    // #region Methods

    /**
     * Orders items for the given query. Implementations must be pure and must not drop items —
     * limiting is the surface's decision.
     *
     * @public
     * @param query The trimmed query; empty while the palette shows its suggestions.
     * @param items The items to order.
     * @returns The ordered items.
     */
    public abstract rank(query: string, items: ReadonlyArray<ICommandItem | ISearchResult>): ReadonlyArray<ICommandItem | ISearchResult>;

    // #endregion
}
