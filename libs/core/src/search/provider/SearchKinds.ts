// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';
import type { SearchFeatureKind } from './SearchFeatureKind';

// #endregion

/**
 * Branded feature kinds accepted by `provideSearch()`.
 *
 * @public
 */
export const SearchKinds = {
    Commands: featureKind<SearchFeatureKind>('search-commands'),
    Providers: featureKind<SearchFeatureKind>('search-providers'),
    Renderers: featureKind<SearchFeatureKind>('search-renderers'),
} as const satisfies Record<string, FeatureKind<SearchFeatureKind>>;
