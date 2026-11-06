// #region Imports

import type { Provider } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { ISearchProvider } from '../models/ISearchProvider';
import type { IWithSearchProvidersOptions } from './IWithSearchProvidersOptions';
import { SEARCH_PROVIDER_TOKEN } from './SEARCH_PROVIDER_TOKEN';
import type { SearchFeatureKind } from './SearchFeatureKind';
import { SearchKinds } from './SearchKinds';

// #endregion

/**
 * Declaratively contributes semantic search providers to `provideSearch()`. The feature is
 * multi-capable: every contributing feature composes one `withSearchProviders()` call.
 *
 * @public
 * @param options The contribution: a stable id plus the provider classes.
 * @returns The feature to pass to `provideSearch()`.
 *
 * @example
 * ```typescript
 * provideSearch({}, withSearchProviders({ id: 'crm', providers: [CustomerSearchProvider] }));
 * ```
 */
export function withSearchProviders(options: IWithSearchProvidersOptions): IFeature<SearchFeatureKind> {
    const providerRecords: ReadonlyArray<Provider> = options.providers.flatMap((provider): ReadonlyArray<Provider> => [
        { provide: provider, useClass: provider },
        {
            provide: SEARCH_PROVIDER_TOKEN,
            useFactory: (instance: ISearchProvider): ReadonlyArray<ISearchProvider> => [instance],
            deps: [provider],
            multi: true,
        },
    ]);

    return createFeature(options.id, SearchKinds.Providers, providerRecords, { multi: true });
}
