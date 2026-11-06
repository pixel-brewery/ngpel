// #region Imports

import type { Type } from '@angular/core';

// #endregion

/**
 * Registration of a component that renders the rows of one result kind. The surface instantiates
 * it dynamically and owns the input contract it is bound with; the engine only carries the
 * registration.
 *
 * @public
 */
export interface ISearchResultRendererEntry {
    // #region Properties

    /**
     * Renderer key. It is matched against `ISearchResult.rendererId` and, when the result declares
     * none, against `ISearchResult.providerId`.
     */
    readonly id: string;

    /**
     * Standalone component rendering one result row.
     */
    readonly component: Type<unknown>;

    // #endregion
}
