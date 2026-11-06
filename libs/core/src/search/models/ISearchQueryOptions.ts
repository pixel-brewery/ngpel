// #region Imports

import type { ISearchResult } from './ISearchResult';

// #endregion

/**
 * Optional observation and cancellation of one search request.
 *
 * @public
 */
export interface ISearchQueryOptions {
    /**
     * Receives the deduplicated semantic results of the providers that have answered so far, in
     * provider registration order. The search promise still resolves with the final results.
     */
    readonly onResults?: (results: ReadonlyArray<ISearchResult>) => void;

    /**
     * Cancels the request and stops delivery of further results.
     */
    readonly signal?: AbortSignal;
}
