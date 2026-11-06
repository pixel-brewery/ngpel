// #region Imports

import type { IUpdateNoNewVersionDetectedEvent } from '../models/IUpdateNoNewVersionDetectedEvent';
import type { IUpdateUnrecoverableEvent } from '../models/IUpdateUnrecoverableEvent';
import type { IUpdateVersionDetectedEvent } from '../models/IUpdateVersionDetectedEvent';
import type { IUpdateVersionInstallationFailedEvent } from '../models/IUpdateVersionInstallationFailedEvent';
import type { IUpdateVersionReadyEvent } from '../models/IUpdateVersionReadyEvent';
import type { IUpdateHandlerStrategy } from './IUpdateHandlerStrategy';

// #endregion

/**
 * No-op base for {@link IUpdateHandlerStrategy} implementations: override only the events a
 * strategy cares about.
 *
 * @public
 */
export abstract class UpdateHandlerStrategyBase implements IUpdateHandlerStrategy {
    // #region Ctor

    /**
     * Constructs a new instance of the `UpdateHandlerStrategyBase` class.
     *
     * @protected
     */
    protected constructor() {
        // protected
    }

    // #endregion

    // #region Methods

    /**
     * A newer version was found and its download is about to start.
     *
     * @public
     * @virtual
     */
    public versionDetected(_event: IUpdateVersionDetectedEvent): void {
        // virtual
    }

    /**
     * Checking for or downloading a newer version failed.
     *
     * @public
     * @virtual
     */
    public versionInstallationFailed(_event: IUpdateVersionInstallationFailedEvent): void {
        // virtual
    }

    /**
     * A newer version is fully downloaded and can be activated.
     *
     * @public
     * @virtual
     */
    public versionReady(_event: IUpdateVersionReadyEvent): void {
        // virtual
    }

    /**
     * A check completed and the running version is still the latest one.
     *
     * @public
     * @virtual
     */
    public noNewVersionDetected(_event: IUpdateNoNewVersionDetectedEvent): void {
        // virtual
    }

    /**
     * The installed version is broken and requires a full reload.
     *
     * @public
     * @virtual
     */
    public unrecoverable(_event: IUpdateUnrecoverableEvent): void {
        // virtual
    }

    // #endregion
}
