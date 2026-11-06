// #region Imports

import { DestroyRef } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { ConsoleNotificationInterceptor } from '../interception/ConsoleNotificationInterceptor';
import type { IConsoleNotificationInterceptorConfig } from '../interception/IConsoleNotificationInterceptorConfig';
import { NOTIFICATION_INTERCEPTORS } from './NOTIFICATION_INTERCEPTORS';
import type { NotificationFeatureKind } from './NotificationFeatureKind';
import { NotificationKinds } from './NotificationKinds';

// #endregion

/**
 * Adds the {@link ConsoleNotificationInterceptor} to `provideNotification()`, so every raised
 * notification is also written to a diagnostic channel. The interceptor is configured while it is
 * constructed, which makes it behave the same whether it is reached through the pipeline or
 * injected directly, and it is disposed with the injector it was composed into.
 *
 * @public
 * @param options Diagnostic channel and disable switch; defaults to the global console, enabled.
 * @returns The feature to pass to `provideNotification()`.
 *
 * @example
 * ```typescript
 * provideNotification(withConsoleNotificationInterceptor({ isDisabled: environment.production }));
 * ```
 */
export function withConsoleNotificationInterceptor(options: IConsoleNotificationInterceptorConfig = {}): IFeature<NotificationFeatureKind> {
    return createFeature('notification-console-interceptor', NotificationKinds.ConsoleInterceptor, [
        {
            provide: ConsoleNotificationInterceptor,
            deps: [DestroyRef],
            useFactory: (destroyRef: DestroyRef): ConsoleNotificationInterceptor => {
                const interceptor = new ConsoleNotificationInterceptor();

                interceptor.configure(options);
                destroyRef.onDestroy(() => interceptor.dispose());

                return interceptor;
            },
        },
        { provide: NOTIFICATION_INTERCEPTORS, useExisting: ConsoleNotificationInterceptor, multi: true },
    ]);
}
