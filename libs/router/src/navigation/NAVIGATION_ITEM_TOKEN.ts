// #region Imports

import { InjectionToken } from '@angular/core';
import type { INavItem } from './INavItem';

// #endregion

/**
 * Multi-provider token for the contributed navigation items. Every provider contributes one batch
 * — the items of one feature library — so the injected value is a list of batches that
 * `NavigationManager` flattens. `withNavigationItems(...)` fills it.
 *
 * @public
 */
export const NAVIGATION_ITEM_TOKEN = new InjectionToken<ReadonlyArray<ReadonlyArray<INavItem>>>('NGPEL_NAVIGATION_ITEMS');
