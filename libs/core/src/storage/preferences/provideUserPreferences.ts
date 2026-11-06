// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import type { UserPreferenceFeatureKind } from './UserPreferenceFeatureKind';

// #endregion

/**
 * Composes the user-preference port. Exactly one storage feature (`withLocalStorage()`,
 * `withSessionStorage()` or `withUserPreferenceStorage()`) binds `USER_PREFERENCE_STORAGE`; two
 * raise the kernel's feature-conflict error, none leaves the token unbound.
 *
 * @public
 * @param features The preference features.
 * @returns Environment providers for the composition root.
 */
export function provideUserPreferences(...features: ReadonlyArray<IFeature<UserPreferenceFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([], features));
}
