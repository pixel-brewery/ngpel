// #region Imports

import { LONG_DURATION } from './LONG_DURATION';
import type { NotificationDuration } from './NotificationDuration';
import { SHORT_DURATION } from './SHORT_DURATION';

// #endregion

/**
 * Resolves a symbolic {@link NotificationDuration} to its lifetime in milliseconds. The mapping is
 * total: everything that is not `'long'` resolves to the short lifetime, so a value that survived
 * an untyped boundary can never produce a notification without a lifetime.
 *
 * @public
 * @param duration The symbolic duration.
 * @returns {@link LONG_DURATION} for `'long'`, otherwise {@link SHORT_DURATION}.
 *
 * @example
 * ```typescript
 * const timeout = notificationDurationToMilliseconds('long');
 * ```
 */
export function notificationDurationToMilliseconds(duration: NotificationDuration): number {
    return duration === 'long' ? LONG_DURATION : SHORT_DURATION;
}
