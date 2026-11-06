// #region Imports

import { DOCUMENT, inject, InjectionToken } from '@angular/core';
import { resolveBrowserStorage } from '../browser/resolveBrowserStorage';

// #endregion

/**
 * The single storage seam of ngpel. Defaults to the `localStorage` of the injected `DOCUMENT`'s
 * window (SSR-safe: `null` when there is no window or the accessor throws). Hosts that need a
 * different backing store (Electron, Capacitor, tests) bind it through
 * `provideBrowserStorage(withStorage(...))`; `localStorageSignal` and the user-preference adapter
 * of `withLocalStorage()` both resolve through it.
 *
 * The token resolves to `null` — never `undefined` — when storage is unavailable, and the surfaces
 * built on it then follow the policy documented on `LocalStorageUnavailableError`.
 *
 * @public
 */
export const BROWSER_STORAGE = new InjectionToken<Storage | null>('NGPEL_BROWSER_STORAGE', {
    providedIn: 'root',
    factory: (): Storage | null => resolveBrowserStorage(inject(DOCUMENT).defaultView),
});
