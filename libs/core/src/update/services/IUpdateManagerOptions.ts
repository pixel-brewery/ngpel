// #region Imports

import type { Observable } from 'rxjs';

// #endregion

/**
 * Construction options of the {@link UpdateManager}.
 *
 * @public
 */
export interface IUpdateManagerOptions {
    // #region Properties

    /**
     * Runs a check as soon as {@link IUpdateManagerOptions.isStable} reports stability.
     *
     * @default false
     */
    readonly checkOnStart?: boolean;

    /**
     * Application stability stream every check waits for before it hits the source (typically
     * `ApplicationRef.isStable`). Defaults to an immediately stable application.
     */
    readonly isStable?: Observable<boolean>;

    // #endregion
}
