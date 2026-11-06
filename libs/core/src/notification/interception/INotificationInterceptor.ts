// #region Imports

import type { INotification } from '../models/INotification';

// #endregion

/**
 * A sink every raised notification is fanned out to: a console logger, a sound, a toast. The
 * pipeline is deliberately fire-and-forget — an interceptor reports nothing back, so one sink can
 * never influence another or the raising caller.
 *
 * @typeParam TConfig Shape of the options the composing `with*` factory passes in.
 * @public
 */
export interface INotificationInterceptor<TConfig extends object = object> {
    // #region Methods

    /**
     * Disposes the interceptor and releases resources.
     */
    dispose(): void;

    /**
     * Applies the options the composing feature was created with. Called once, while the
     * composition root builds the interceptor list.
     *
     * @param config The options to apply.
     */
    configure(config: TConfig): void;

    /**
     * Handles one raised notification.
     *
     * @param notification The raised notification.
     */
    push(notification: INotification): void;

    // #endregion
}
