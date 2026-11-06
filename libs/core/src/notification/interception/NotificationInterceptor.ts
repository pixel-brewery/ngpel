// #region Imports

import type { INotification } from '../models/INotification';
import type { INotificationInterceptor } from './INotificationInterceptor';

// #endregion

/**
 * Base class for a notification sink. It owns the configuration handshake so a subclass only has to
 * answer {@link NotificationInterceptor.push}: the composing `with*` factory calls
 * {@link NotificationInterceptor.configure} once, and the options are readable from
 * {@link NotificationInterceptor.config} afterwards.
 *
 * A subclass that holds browser resources overrides {@link NotificationInterceptor.dispose}; one
 * that holds none inherits the no-op.
 *
 * @typeParam TConfig Shape of the options the composing `with*` factory passes in.
 * @public
 */
export abstract class NotificationInterceptor<TConfig extends object = object> implements INotificationInterceptor<TConfig> {
    // #region Fields

    private _config: TConfig | null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `NotificationInterceptor` class in its unconfigured state.
     *
     * @protected
     */
    protected constructor() {
        this._config = null;
    }

    // #endregion

    // #region Properties

    /**
     * The applied options, or `null` while the interceptor is unconfigured.
     *
     * @protected
     */
    protected get config(): TConfig | null {
        return this._config;
    }

    // #endregion

    // #region Methods

    /**
     * Handles one raised notification.
     *
     * @public
     * @abstract
     * @param notification The raised notification.
     */
    public abstract push(notification: INotification): void;

    /**
     * Applies the options the composing feature was created with, replacing any earlier ones.
     *
     * @public
     * @virtual
     * @param config The options to apply.
     */
    public configure(config: TConfig): void {
        this._config = config;
    }

    /**
     * Releases the resources of the interceptor. The base implementation holds none and does
     * nothing; a subclass that owns browser resources overrides it.
     *
     * @public
     * @virtual
     */
    public dispose(): void {
        return;
    }

    // #endregion
}
