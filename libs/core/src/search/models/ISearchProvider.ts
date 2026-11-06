// #region Imports

import type { ISearchResult } from './ISearchResult';
import type { SearchSectionLayout } from './SearchSectionLayout';

// #endregion

/**
 * Contract for features that contribute semantic search. A provider searches its own domain
 * objects and activates a result when the user selects it.
 *
 * @public
 * @typeParam TData Type of the opaque payload carried by the results of this provider.
 */
export interface ISearchProvider<TData = unknown> {
    // #region Properties

    /**
     * Unique provider identifier, for example `'crm.customers'`. Prefix the ids of the results it
     * produces with it (`'crm.customers:42'`) so the manager can route activation back.
     */
    readonly id: string;

    /**
     * Human-readable label shown by provider filters.
     */
    readonly label: string;

    /**
     * Layout of the result section owned by this provider. Defaults to `'list'`.
     */
    readonly layout?: SearchSectionLayout;

    /**
     * Marks the provider as exclusive: it is excluded from ordinary searches and from the provider
     * filter, and is queried only while it is the active exclusive provider. Products use this for
     * a mode that replaces the ordinary result set, such as an assistant answering the raw query.
     *
     * @defaultValue `false`
     */
    readonly isExclusive?: boolean;

    // #endregion

    // #region Methods

    /**
     * Determines whether the current user may use this provider. When omitted, the provider is
     * always accessible. Returning `false` hides it and excludes it from every query.
     */
    canAccess?(): boolean;

    /**
     * Searches for results matching the query. An empty query asks for the provider's default
     * result set. Implementations may use the signal to stop work when the caller cancels.
     *
     * @param query The trimmed query, or an empty string for "return everything you have".
     * @param take Maximum number of results the surface will use, when it declared a limit.
     * @param signal Cancels the request when supplied by the caller.
     */
    search(query: string, take?: number, signal?: AbortSignal): Promise<ReadonlyArray<ISearchResult<TData>>> | ReadonlyArray<ISearchResult<TData>>;

    /**
     * Activates a result of this provider, for example by navigating to the entity it describes.
     *
     * @param result The selected result.
     * @returns `false` when the result could not be opened. A void return counts as success.
     */
    activate(result: ISearchResult<TData>): Promise<boolean | void> | boolean | void;

    // #endregion
}
