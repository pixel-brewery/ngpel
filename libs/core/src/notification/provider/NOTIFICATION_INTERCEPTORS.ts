// #region Imports

import { InjectionToken } from '@angular/core';
import type { INotificationInterceptor } from '../interception/INotificationInterceptor';

// #endregion

/**
 * Multi-provider token of the sinks {@link NotificationService} fans every raised notification out
 * to. Each `with*NotificationInterceptor()` feature contributes one configured interceptor.
 *
 * @public
 */
export const NOTIFICATION_INTERCEPTORS = new InjectionToken<ReadonlyArray<INotificationInterceptor>>('NGPEL_NOTIFICATION_INTERCEPTORS');
