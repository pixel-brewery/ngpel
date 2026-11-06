// #region Imports

import { InjectionToken } from '@angular/core';
import type { IUserPreferenceStorage } from './IUserPreferenceStorage';

// #endregion

/**
 * Injection token of the active user-preference storage adapter. It has no default factory on
 * purpose: importing the token must not pull any adapter into the bundle. Bind it through
 * `provideUserPreferences(withLocalStorage())`, `withSessionStorage()` or
 * `withUserPreferenceStorage(() => adapter)`.
 *
 * @public
 */
export const USER_PREFERENCE_STORAGE = new InjectionToken<IUserPreferenceStorage>('NGPEL_USER_PREFERENCE_STORAGE');
