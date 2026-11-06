// #region Imports

import { InjectionToken } from '@angular/core';
import type { INavHandleHandler } from './INavHandleHandler';

// #endregion

/**
 * Multi-provider token for {@link INavHandleHandler} implementations. The last handler registered
 * for a scheme wins, so a product handler overrides the built-in `route:` and `ext:` behavior.
 *
 * @public
 */
export const NAV_HANDLE_HANDLER = new InjectionToken<ReadonlyArray<INavHandleHandler>>('NGPEL_NAV_HANDLE_HANDLER');
