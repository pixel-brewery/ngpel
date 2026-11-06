// #region Imports

import type { Provider } from '@angular/core';
import type { IFeature } from './IFeature';
import type { IFeatureIncompatibilityRule } from './IFeatureIncompatibilityRule';
import { validateFeatures } from './validateFeatures';

// #endregion

/**
 * Composes base providers with validated feature providers.
 *
 * @public
 * @param base Base providers of a runtime (e.g., a service).
 * @param features Features contributing providers.
 * @param rules Optional incompatibility rules.
 * @returns Combined provider array for Angular DI.
 */
export function composeProviders<TKind extends string>(
    base: ReadonlyArray<Provider>,
    features: ReadonlyArray<IFeature<TKind>>,
    rules: ReadonlyArray<IFeatureIncompatibilityRule<TKind>> = [],
): Provider[] {
    validateFeatures(features, rules);
    const contributed: Provider[] = features.flatMap((feature): ReadonlyArray<Provider> => feature.provide());
    return [...base, ...contributed];
}
