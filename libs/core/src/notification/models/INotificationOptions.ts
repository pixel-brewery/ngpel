// #region Imports

import type { NotificationDuration } from './NotificationDuration';
import type { NotificationText } from './NotificationText';

// #endregion

/**
 * The parts of an {@link INotificationMessage} the typed convenience methods of
 * {@link NotificationService} do not take positionally.
 *
 * @public
 */
export interface INotificationOptions {
    // #region Properties

    /**
     * Symbolic lifetime; defaults to `'short'`.
     */
    readonly duration?: NotificationDuration;

    /**
     * When `true` the message reaches the interceptors but is not kept in the history.
     */
    readonly silent?: boolean;

    /**
     * Optional secondary headline.
     */
    readonly subTitle?: NotificationText;

    // #endregion
}
