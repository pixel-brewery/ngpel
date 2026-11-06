// #region Imports

import type { IUpdateVersion } from './IUpdateVersion';

// #endregion

/**
 * Checking for or downloading a newer version failed.
 *
 * @public
 */
export interface IUpdateVersionInstallationFailedEvent {
    // #region Properties

    /**
     * Discriminator.
     */
    readonly type: 'versionInstallationFailed';

    /**
     * The version whose installation failed.
     */
    readonly version: IUpdateVersion;

    /**
     * Human-readable failure description.
     */
    readonly error: string;

    // #endregion
}
