// #region Imports

import { InjectionToken } from '@angular/core';
import type { IUpdateSource } from '../models/IUpdateSource';

// #endregion

/**
 * Injection token of the single {@link IUpdateSource} the manager listens to. Registered by
 * `withUpdateSource()` or an adapter feature such as `withServiceWorkerUpdateSource()`.
 *
 * @public
 */
export const UPDATE_SOURCE = new InjectionToken<IUpdateSource>('NGPEL_UPDATE_SOURCE');
