// #region Imports

import type { ReadonlyDeep } from './ReadonlyDeep';

// #endregion

/**
 * A semantic search result produced by a search provider.
 *
 * @public
 * @typeParam TData Type of the opaque payload the owning provider needs to activate the result.
 */
export interface ISearchResult<TData = unknown> {
    // #region Properties

    /**
     * Stable identifier of the result. Namespace it with the owning provider id
     * (`'<providerId>:<entityId>'`) — the manager resolves the activating provider from that
     * prefix before it falls back to {@link ISearchResult.providerId}. Results that share an id
     * are collapsed to the first occurrence.
     */
    readonly id: string;

    /**
     * Identifier of the provider that produced the result. The manager fills it in when the
     * provider left it empty, so consumers can rely on it.
     */
    readonly providerId?: string;

    /**
     * Optional renderer key selecting a registered renderer component. Defaults to the provider id.
     */
    readonly rendererId?: string;

    /**
     * Primary label text and the strongest ranking signal.
     */
    readonly label: string;

    /**
     * Optional second line of descriptive text.
     */
    readonly description?: string;

    /**
     * Optional icon name. The surface decides which icon set the name is resolved against.
     */
    readonly icon?: string;

    /**
     * Optional group heading. Results without a group are grouped by their provider id.
     */
    readonly group?: string;

    /**
     * Optional synonyms that make the result findable under wording it does not display.
     */
    readonly keywords?: ReadonlyArray<string>;

    /**
     * Optional payload handed back to the owning provider on activation. It is deeply readonly:
     * the result travels through ranking, grouping and rendering, and none of those may mutate it.
     */
    readonly data?: ReadonlyDeep<TData>;

    // #endregion
}
