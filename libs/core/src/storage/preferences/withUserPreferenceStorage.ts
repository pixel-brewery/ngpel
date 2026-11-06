// #region Imports

import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { IUserPreferenceStorage } from './IUserPreferenceStorage';
import { USER_PREFERENCE_STORAGE } from './USER_PREFERENCE_STORAGE';
import { type UserPreferenceFeatureKind, UserPreferenceFeatureKinds } from './UserPreferenceFeatureKind';

// #endregion

/**
 * Binds a custom adapter of the user-preference port, for hosts whose preferences live outside
 * Web Storage (an Electron bridge, a remote profile). The factory runs in the injection context.
 *
 * @public
 * @param factory Creates the adapter.
 * @returns The storage feature for `provideUserPreferences()`.
 */
export function withUserPreferenceStorage(factory: () => IUserPreferenceStorage): IFeature<UserPreferenceFeatureKind> {
    return createFeature('custom', UserPreferenceFeatureKinds.Storage, [{ provide: USER_PREFERENCE_STORAGE, useFactory: factory }]);
}
