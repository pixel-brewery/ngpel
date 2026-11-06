// #region Imports

import { type EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { DefaultSearchRankingStrategy } from '../services/DefaultSearchRankingStrategy';
import { SearchManager } from '../services/SearchManager';
import { SearchRankingStrategy } from '../services/SearchRankingStrategy';
import type { ISearchConfig } from './ISearchConfig';
import { SEARCH_CONFIG } from './SEARCH_CONFIG';
import type { SearchFeatureKind } from './SearchFeatureKind';

// #endregion

/**
 * Composition root of the search capability. It publishes the configuration, registers the
 * {@link SearchManager} together with the default ranking, and composes the commands, providers and
 * renderers contributed by features. The manager is created eagerly so that a configured hotkey is
 * bound before the first surface exists.
 *
 * `SearchSession` is deliberately not provided here: every surface declares it in its own
 * providers so that two surfaces keep separate state. Applications replace the ranking by
 * providing their own {@link SearchRankingStrategy} after this call.
 *
 * @public
 * @param config Behavioural options of the engine. Pass `{}` to accept every default.
 * @param features The contributions: `withSearchCommands()`, `withSearchProviders()` and
 * `withSearchRenderers()`.
 * @returns Environment providers for the application composition root.
 * @throws Error when two contributions of the same kind share an id.
 *
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *     providers: [
 *         provideSearch(
 *             { hotkey: 'meta+k', resultTake: 10 },
 *             withSearchCommands({ id: 'settings', sources: [SettingsCommandSource] }),
 *             withSearchProviders({ id: 'crm', providers: [CustomerSearchProvider] })
 *         )
 *     ]
 * };
 * ```
 */
export function provideSearch(config: ISearchConfig, ...features: ReadonlyArray<IFeature<SearchFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders([
        ...composeProviders(
            [{ provide: SEARCH_CONFIG, useValue: config }, SearchManager, { provide: SearchRankingStrategy, useClass: DefaultSearchRankingStrategy }],
            features,
        ),
        provideEnvironmentInitializer(() => {
            inject(SearchManager);
        }),
    ]);
}
