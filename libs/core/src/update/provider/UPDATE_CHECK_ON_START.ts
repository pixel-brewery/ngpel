// #region Imports

import { InjectionToken } from '@angular/core';

// #endregion

/**
 * Whether the manager runs a check as soon as the application is stable. Set by
 * `provideUpdate({ checkOnStart })`.
 *
 * @public
 */
export const UPDATE_CHECK_ON_START = new InjectionToken<boolean>('NGPEL_UPDATE_CHECK_ON_START');
