// #region Imports

import type { IUpdateVersion } from './IUpdateVersion';

// #endregion

/**
 * A newer version was found and its download is about to start.
 *
 * @public
 */
export interface IUpdateVersionDetectedEvent {
    // #region Properties

    /**
     * Discriminator.
     */
    readonly type: 'versionDetected';

    /**
     * The detected version.
     */
    readonly version: IUpdateVersion;

    // #endregion
}
