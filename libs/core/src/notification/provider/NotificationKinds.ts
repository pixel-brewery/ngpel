// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';
import type { NotificationFeatureKind } from './NotificationFeatureKind';

// #endregion

/**
 * Branded feature kinds accepted by `provideNotification()`.
 *
 * @public
 */
export const NotificationKinds = {
    AudioInterceptor: featureKind<NotificationFeatureKind>('notification-audio-interceptor'),
    ConsoleInterceptor: featureKind<NotificationFeatureKind>('notification-console-interceptor'),
} as const satisfies Record<string, FeatureKind<NotificationFeatureKind>>;
