// #region Imports

import type { Provider } from '@angular/core';
import { composeProviders } from './composeProviders';
import type { IFeature } from './IFeature';
import type { IFeatureIncompatibilityRule } from './IFeatureIncompatibilityRule';

// #endregion

/**
 * Convenience to compose a **single** base provider with features.
 *
 * @public
 * @param base Single base provider instance.
 * @param features Features contributing providers.
 * @param rules Optional incompatibility rules.
 */
export function composeWithBase<TKind extends string>(
    base: Provider,
    features: ReadonlyArray<IFeature<TKind>>,
    rules: ReadonlyArray<IFeatureIncompatibilityRule<TKind>> = [],
): Provider[] {
    return composeProviders([base], features, rules);
}
