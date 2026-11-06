// #region Imports

import { DOCUMENT, inject, InjectionToken } from '@angular/core';

// #endregion

/**
 * The window `ext:` handles are opened on. Defaults to the window of the injected `DOCUMENT`, so
 * the package needs no global access and stays safe where there is none. Desktop shells that route
 * external URLs through their own process rebind it, or bind `null` to suppress external
 * navigation entirely.
 *
 * @public
 */
export const NAVIGATION_WINDOW = new InjectionToken<Window | null>('NGPEL_NAVIGATION_WINDOW', {
    providedIn: 'root',
    factory: (): Window | null => inject(DOCUMENT).defaultView,
});
