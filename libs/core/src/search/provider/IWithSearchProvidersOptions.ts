// #region Imports

import type { Type } from '@angular/core';
import type { ISearchProvider } from '../models/ISearchProvider';

// #endregion

/**
 * Options for contributing semantic search providers through `withSearchProviders()`.
 *
 * @public
 */
export interface IWithSearchProvidersOptions {
    // #region Properties

    /**
     * Stable unique id of this contribution (unique among all provider features).
     */
    readonly id: string;

    /**
     * Injectable provider classes. Each class is registered as itself and as a search provider, so
     * it can inject services and be injected in turn.
     */
    readonly providers: ReadonlyArray<Type<ISearchProvider>>;

    // #endregion
}
