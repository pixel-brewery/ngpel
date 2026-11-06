/**
 * User-facing texts of the update lifecycle. Products replace the neutral English defaults through
 * `provideUpdate({ intl })` instead of the package shipping a translation catalogue.
 *
 * @public
 */
export interface IUpdateIntl {
    // #region Properties

    /**
     * Headline shown when a newer version is ready for activation.
     */
    readonly readyHeader: string;

    /**
     * Body shown when a newer version is ready for activation.
     */
    readonly readyMessage: string;

    /**
     * Headline shown when the installed version can no longer be used.
     */
    readonly unrecoverableHeader: string;

    /**
     * Body shown when the installed version can no longer be used.
     */
    readonly unrecoverableMessage: string;

    /**
     * Headline shown when a newer version could not be installed.
     */
    readonly installationFailedHeader: string;

    /**
     * Body shown when a newer version could not be installed.
     */
    readonly installationFailedMessage: string;

    /**
     * Text shown when a check found no newer version.
     */
    readonly noNewVersionMessage: string;

    /**
     * Label of the action that reloads the application.
     */
    readonly reloadLabel: string;

    // #endregion
}
