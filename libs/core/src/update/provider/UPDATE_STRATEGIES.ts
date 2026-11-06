// #region Imports

import { InjectionToken } from '@angular/core';
import type { IUpdateHandlerStrategy } from '../strategies/IUpdateHandlerStrategy';

// #endregion

/**
 * Multi-provider token of the registered {@link IUpdateHandlerStrategy} instances. Every event is
 * dispatched to all of them in registration order.
 *
 * @public
 */
export const UPDATE_STRATEGIES = new InjectionToken<ReadonlyArray<IUpdateHandlerStrategy>>('NGPEL_UPDATE_STRATEGIES');
