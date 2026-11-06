// #region Imports

import type { BrowserStorageArea } from './BrowserStorageArea';

// #endregion

/**
 * Resolves a Web Storage area of a window when the accessor is usable. The accessor can throw (for
 * example under a restrictive storage policy) and the window itself is absent outside a browser,
 * so both cases degrade to `null` — the marker this entry point uses for "storage is unavailable",
 * never `undefined`, which always means "not specified, resolve the default".
 *
 * The window is passed in rather than read from a module global: inside an injection context it
 * comes from `inject(DOCUMENT).defaultView`, at bootstrap (outside any injector) from
 * `globalThis.window ?? null`. An implicit global fallback would make the result depend on an
 * ambient object that neither a host nor a spec can substitute, and would silently reach the real
 * `localStorage` whenever a caller passes an `undefined` window by accident.
 *
 * @public
 * @param browserWindow The window to resolve from; `null` marks a non-browser context.
 * @param area The storage area (defaults to `'localStorage'`).
 * @returns The storage, or `null` when it is unavailable.
 */
export function resolveBrowserStorage(browserWindow: Pick<Window, BrowserStorageArea> | null, area: BrowserStorageArea = 'localStorage'): Storage | null {
    if (browserWindow === null) {
        return null;
    }

    try {
        const storage: Storage | undefined = browserWindow[area];

        return storage ?? null;
    } catch {
        return null;
    }
}
