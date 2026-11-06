/**
 * Configures one storage-backed signal.
 *
 * @public
 */
export interface ILocalStorageSignalOptions {
    // #region Properties

    /**
     * Receives changes from other documents of the same origin through the browser `storage`
     * event. Defaults to `true`.
     */
    readonly syncAcrossTabs?: boolean;

    /**
     * Overrides the storage implementation. Defaults to the injected `BROWSER_STORAGE`; passing
     * `null` declares storage unavailable, matching SSR behavior: the signal reads as `undefined`
     * and `set()`, `update()`, `clear()` and `refresh()` throw `LocalStorageUnavailableError`, per
     * the policy documented on that error.
     */
    readonly storage?: Storage | null;

    /**
     * Overrides the source of `storage` events. Defaults to the window of the injected `DOCUMENT`;
     * passing `null` disables cross-document synchronization.
     */
    readonly eventTarget?: EventTarget | null;

    // #endregion
}
