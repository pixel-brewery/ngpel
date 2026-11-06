// #region Imports

import { inject } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { BROWSER_STORAGE } from '../angular/BROWSER_STORAGE';
import type { IUserPreferenceStorage } from './IUserPreferenceStorage';
import { USER_PREFERENCE_STORAGE } from './USER_PREFERENCE_STORAGE';
import { type UserPreferenceFeatureKind, UserPreferenceFeatureKinds } from './UserPreferenceFeatureKind';
import { WebStorageUserPreferenceStorage } from './WebStorageUserPreferenceStorage';

// #endregion

/**
 * Stores preferences in the storage bound to `BROWSER_STORAGE` — the window's `localStorage` by
 * default, or whatever the host substituted through `provideBrowserStorage(withStorage(...))`.
 * The adapter is only reachable through this call, so the token itself stays adapter-free.
 *
 * @public
 * @returns The storage feature for `provideUserPreferences()`.
 */
export function withLocalStorage(): IFeature<UserPreferenceFeatureKind> {
    return createFeature('local-storage', UserPreferenceFeatureKinds.Storage, [
        {
            provide: USER_PREFERENCE_STORAGE,
            useFactory: (): IUserPreferenceStorage => new WebStorageUserPreferenceStorage(inject(BROWSER_STORAGE)),
        },
    ]);
}
