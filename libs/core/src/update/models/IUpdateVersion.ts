/**
 * Identifies one application version inside an update event.
 *
 * @public
 */
export interface IUpdateVersion {
    // #region Properties

    /**
     * Version identifier: the manifest hash for a service worker, the semantic version for a
     * desktop or mobile channel.
     */
    readonly id: string;

    /**
     * Arbitrary metadata the source attaches to the version (for example the service worker
     * manifest `appData`).
     */
    readonly appData?: object;

    // #endregion
}
