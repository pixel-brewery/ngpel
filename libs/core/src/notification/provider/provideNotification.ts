// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders, type Provider } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { NotificationService } from '../services/NotificationService';
import type { NotificationFeatureKind } from './NotificationFeatureKind';

// #endregion

/**
 * Root environment provider of the notification pipeline: registers {@link NotificationService} and
 * composes the sinks the passed features contribute. Composed without a feature the service still
 * works — messages are materialized and kept in the history, they just reach no sink.
 *
 * @public
 * @param features `withConsoleNotificationInterceptor()` and `withAudioNotificationInterceptor()`.
 * @returns Environment providers for the application or route composition root.
 * @throws Error when two features of the same kind are composed.
 *
 * @example
 * ```typescript
 * export const appConfig = {
 *     providers: [
 *         provideNotification(
 *             withConsoleNotificationInterceptor({ isDisabled: environment.production }),
 *             withAudioNotificationInterceptor({ sounds: { error: '/audio/alert.mp3' } })
 *         )
 *     ]
 * };
 * ```
 */
export function provideNotification(...features: ReadonlyArray<IFeature<NotificationFeatureKind>>): EnvironmentProviders {
    const providers: ReadonlyArray<Provider> = composeProviders([{ provide: NotificationService, useClass: NotificationService }], features);

    return makeEnvironmentProviders([...providers]);
}
