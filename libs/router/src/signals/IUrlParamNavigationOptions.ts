/**
 * Configures the browser history behavior of a URL-backed signal.
 *
 * @public
 */
export interface IUrlParamNavigationOptions {
    // #region Properties

    /**
     * Replaces the current history entry instead of pushing a new one. Defaults to `false`.
     */
    readonly replaceUrl?: boolean;

    // #endregion
}
