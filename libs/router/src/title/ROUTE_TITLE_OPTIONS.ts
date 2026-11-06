// #region Imports

import { InjectionToken } from '@angular/core';
import type { IRouteTitleOptions } from './IRouteTitleOptions';

// #endregion

/**
 * Injection token for the {@link IRouteTitleOptions}. Defaults to the neutral options — no
 * application name, `' · '` as separator — and is bound by `provideRouteDataTitleStrategy(...)`.
 *
 * @public
 */
export const ROUTE_TITLE_OPTIONS = new InjectionToken<IRouteTitleOptions>('NGPEL_ROUTE_TITLE_OPTIONS', {
    providedIn: 'root',
    factory: (): IRouteTitleOptions => ({}),
});
