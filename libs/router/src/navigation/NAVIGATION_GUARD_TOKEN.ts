// #region Imports

import { InjectionToken } from '@angular/core';
import type { INavigationGuard } from './INavigationGuard';

// #endregion

/**
 * Multi-provider token for the navigation guards. Every provider contributes one guard;
 * `withNavigationGuard(...)` fills it.
 *
 * @public
 */
export const NAVIGATION_GUARD_TOKEN = new InjectionToken<ReadonlyArray<INavigationGuard>>('NGPEL_NAVIGATION_GUARDS');
