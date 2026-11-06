// #region Imports

import { Injectable } from '@angular/core';
import type { ICommandItem } from '../models/ICommandItem';
import type { ISearchResult } from '../models/ISearchResult';
import { SearchRankingStrategy } from './SearchRankingStrategy';

// #endregion

/**
 * Default ranking: an exact label match wins over a label prefix, a label prefix over a label
 * substring, and both text fields of lower weight (description, keywords) come last. Items that
 * match nowhere keep their contributed order behind the matches, because the sort is stable.
 *
 * @public
 */
@Injectable()
export class DefaultSearchRankingStrategy extends SearchRankingStrategy {
    // #region Ctor

    /**
     * Constructs a new instance of the `DefaultSearchRankingStrategy` class.
     *
     * @public
     */
    public constructor() {
        super();
    }

    // #endregion

    // #region Methods

    /**
     * Orders exact and prefix matches before loose keyword matches. An empty query keeps the
     * contributed order.
     *
     * @public
     * @param query The trimmed query.
     * @param items The items to order.
     * @returns The ordered items.
     */
    public override rank(query: string, items: ReadonlyArray<ICommandItem | ISearchResult>): ReadonlyArray<ICommandItem | ISearchResult> {
        const normalizedQuery = query.trim().toLowerCase();

        if (normalizedQuery.length === 0) {
            return items;
        }

        return [...items].sort((left, right) => this.score(right, normalizedQuery) - this.score(left, normalizedQuery));
    }

    /**
     * Scores one item against the normalized query.
     */
    private score(item: ICommandItem | ISearchResult, query: string): number {
        const label = item.label.toLowerCase();

        if (label === query) {
            return 100;
        }

        if (label.startsWith(query)) {
            return 80;
        }

        if (label.includes(query)) {
            return 60;
        }

        if ((item.description ?? '').toLowerCase().includes(query)) {
            return 40;
        }

        if ((item.keywords ?? []).join('\n').toLowerCase().includes(query)) {
            return 30;
        }

        return 0;
    }

    // #endregion
}
