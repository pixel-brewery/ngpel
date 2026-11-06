// #region Imports

import type { IUpdateVersion } from './IUpdateVersion';

// #endregion

/**
 * A check completed and the running version is still the latest one.
 *
 * @public
 */
export interface IUpdateNoNewVersionDetectedEvent {
    // #region Properties

    /**
     * Discriminator.
     */
    readonly type: 'noNewVersionDetected';

    /**
     * The version that is still current.
     */
    readonly version: IUpdateVersion;

    // #endregion
}
