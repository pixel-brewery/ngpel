// #region Imports

import type { ISearchResultRendererEntry } from '../models/ISearchResultRendererEntry';

// #endregion

/**
 * Options for contributing result renderers through `withSearchRenderers()`.
 *
 * @public
 */
export interface IWithSearchRenderersOptions {
    // #region Properties

    /**
     * Stable unique id of this contribution (unique among all renderer features).
     */
    readonly id: string;

    /**
     * Renderer registrations. Their ids match `ISearchResult.rendererId` or, as a fallback, the
     * producing provider id.
     */
    readonly entries: ReadonlyArray<ISearchResultRendererEntry>;

    // #endregion
}
