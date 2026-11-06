// #region Imports

import type { IUpdateVersion } from './IUpdateVersion';

// #endregion

/**
 * A newer version is fully downloaded and can be activated.
 *
 * @public
 */
export interface IUpdateVersionReadyEvent {
    // #region Properties

    /**
     * Discriminator.
     */
    readonly type: 'versionReady';

    /**
     * The version currently running.
     */
    readonly currentVersion: IUpdateVersion;

    /**
     * The version ready for activation.
     */
    readonly latestVersion: IUpdateVersion;

    // #endregion
}
