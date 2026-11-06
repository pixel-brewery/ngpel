// #region Imports

import type { Signal } from '@angular/core';
import type { NotificationType } from './NotificationType';

// #endregion

/**
 * A raised notification. It is what {@link NotificationService} materializes from an
 * {@link INotificationMessage} and hands to every interceptor: identified, timestamped and with
 * every text normalized to a signal, so an interceptor never has to know whether the caller passed
 * a string or a reactive caption.
 *
 * @public
 */
export interface INotification {
    // #region Properties

    /**
     * Identifier unique to this notification, used to remove it from the history again.
     */
    readonly id: string;

    /**
     * Severity of the notification.
     */
    readonly type: NotificationType;

    /**
     * Headline of the notification.
     */
    readonly title: Signal<string>;

    /**
     * Secondary headline; empty when the message stated none.
     */
    readonly subTitle: Signal<string>;

    /**
     * Main text of the notification.
     */
    readonly body: Signal<string>;

    /**
     * Diagnostic detail such as a correlation id, shown only where there is room for it.
     */
    readonly detail?: Signal<string>;

    /**
     * Lifetime in milliseconds, resolved from the message's symbolic duration.
     */
    readonly duration: number;

    /**
     * Moment the notification was raised.
     */
    readonly timeStamp: Date;

    // #endregion
}
