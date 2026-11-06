// #region Imports

import { DOCUMENT, inject } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { resolveBrowserStorage } from '../browser/resolveBrowserStorage';
import type { IUserPreferenceStorage } from './IUserPreferenceStorage';
import { USER_PREFERENCE_STORAGE } from './USER_PREFERENCE_STORAGE';
import { type UserPreferenceFeatureKind, UserPreferenceFeatureKinds } from './UserPreferenceFeatureKind';
import { WebStorageUserPreferenceStorage } from './WebStorageUserPreferenceStorage';

// #endregion

/**
 * Stores preferences in the `sessionStorage` of the injected `DOCUMENT`'s window, so they live
 * only as long as the browsing session.
 *
 * Unlike `withLocalStorage()`, this feature deliberately does not resolve through `BROWSER_STORAGE`:
 * that token names one storage instance and has no area dimension, so honouring it would turn a
 * session-scoped preference into a persistent one behind the caller's back. A host that substitutes
 * its own store through `provideBrowserStorage(withStorage(...))` therefore substitutes it for
 * `withLocalStorage()` alone; a host that needs a substituted session store binds
 * `withUserPreferenceStorage()` with its own adapter instead.
 *
 * @public
 * @returns The storage feature for `provideUserPreferences()`.
 */
export function withSessionStorage(): IFeature<UserPreferenceFeatureKind> {
    return createFeature('session-storage', UserPreferenceFeatureKinds.Storage, [
        {
            provide: USER_PREFERENCE_STORAGE,
            useFactory: (): IUserPreferenceStorage =>
                new WebStorageUserPreferenceStorage(resolveBrowserStorage(inject(DOCUMENT).defaultView, 'sessionStorage')),
        },
    ]);
}
