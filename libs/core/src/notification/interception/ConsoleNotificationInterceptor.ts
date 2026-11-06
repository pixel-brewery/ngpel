// #region Imports

import { Injectable } from '@angular/core';
import type { INotification } from '../models/INotification';
import { NotificationType } from '../models/NotificationType';
import type { IConsoleNotificationInterceptorConfig } from './IConsoleNotificationInterceptorConfig';
import { NotificationInterceptor } from './NotificationInterceptor';

// #endregion

/**
 * Writes every raised notification to a diagnostic channel, mapping the severity onto the matching
 * console level. Compose it with `withConsoleNotificationInterceptor()` to keep a record of what a
 * session was told in environments that have no visible notification surface.
 *
 * @public
 */
@Injectable()
export class ConsoleNotificationInterceptor extends NotificationInterceptor<IConsoleNotificationInterceptorConfig> {
    // #region Ctor

    /**
     * Constructs a new instance of the `ConsoleNotificationInterceptor` class.
     *
     * @public
     */
    public constructor() {
        super();
    }

    // #endregion

    // #region Methods

    /**
     * Writes the notification to the configured channel, unless writing is disabled.
     *
     * @public
     * @override
     * @param notification The raised notification.
     */
    public push(notification: INotification): void {
        const config = this.config;

        if (config?.isDisabled) {
            return;
        }

        const logger = config?.logger ?? console;
        const message = this.format(notification);

        switch (notification.type) {
            case NotificationType.Info:
                logger.info(message);
                break;
            case NotificationType.Warning:
                logger.warn(message);
                break;
            case NotificationType.Error:
                logger.error(message);
                break;
            case NotificationType.None:
            case NotificationType.Success:
                logger.log(message);
                break;
        }
    }

    /**
     * Joins the readable parts of a notification into one console line.
     *
     * @param notification The raised notification.
     * @returns The parts that carry text, separated by line breaks.
     */
    private format(notification: INotification): string {
        return [notification.title(), notification.subTitle(), notification.body(), notification.detail?.()]
            .filter((part: string | undefined): part is string => Boolean(part))
            .join('\n');
    }

    // #endregion
}
