// #region Imports

import type { NotificationDuration } from './NotificationDuration';
import type { NotificationText } from './NotificationText';
import type { NotificationType } from './NotificationType';

// #endregion

/**
 * What a caller hands to {@link NotificationService.push}: the raw message, before an id, a
 * timestamp and a resolved lifetime turn it into an {@link INotification}.
 *
 * @public
 */
export interface INotificationMessage {
    // #region Properties

    /**
     * Headline of the message.
     */
    readonly title: NotificationText;

    /**
     * Optional secondary headline.
     */
    readonly subTitle?: NotificationText;

    /**
     * Main text of the message.
     */
    readonly content: NotificationText;

    /**
     * Optional diagnostic detail such as a correlation id.
     */
    readonly detail?: NotificationText;

    /**
     * Severity of the message; defaults to {@link NotificationType.None}.
     */
    readonly type?: NotificationType;

    /**
     * When `true` the message reaches the interceptors but is not kept in the history.
     */
    readonly silent?: boolean;

    /**
     * Symbolic lifetime; defaults to `'short'`.
     */
    readonly duration?: NotificationDuration;

    // #endregion
}
