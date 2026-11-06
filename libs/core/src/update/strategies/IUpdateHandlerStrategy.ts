// #region Imports

import type { IUpdateNoNewVersionDetectedEvent } from '../models/IUpdateNoNewVersionDetectedEvent';
import type { IUpdateUnrecoverableEvent } from '../models/IUpdateUnrecoverableEvent';
import type { IUpdateVersionDetectedEvent } from '../models/IUpdateVersionDetectedEvent';
import type { IUpdateVersionInstallationFailedEvent } from '../models/IUpdateVersionInstallationFailedEvent';
import type { IUpdateVersionReadyEvent } from '../models/IUpdateVersionReadyEvent';

// #endregion

/**
 * Reacts to update lifecycle events. The manager fans every event out to all registered
 * strategies, so a logging strategy and a user-facing one can coexist.
 *
 * @public
 */
export interface IUpdateHandlerStrategy {
    // #region Methods

    /**
     * A newer version was found and its download is about to start.
     */
    versionDetected(event: IUpdateVersionDetectedEvent): void;

    /**
     * Checking for or downloading a newer version failed.
     */
    versionInstallationFailed(event: IUpdateVersionInstallationFailedEvent): void;

    /**
     * A newer version is fully downloaded and can be activated.
     */
    versionReady(event: IUpdateVersionReadyEvent): void;

    /**
     * A check completed and the running version is still the latest one.
     */
    noNewVersionDetected(event: IUpdateNoNewVersionDetectedEvent): void;

    /**
     * The installed version is broken and requires a full reload.
     */
    unrecoverable(event: IUpdateUnrecoverableEvent): void;

    // #endregion
}
