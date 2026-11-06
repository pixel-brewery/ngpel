/**
 * Configures {@link RouteDataTitleStrategy}. Every member is optional and product-neutral by
 * default: no application name is appended unless one is configured.
 *
 * @public
 */
export interface IRouteTitleOptions {
    // #region Properties

    /**
     * Appended as the last title segment, for example `'Contoso'`. Defaults to no suffix.
     */
    readonly appName?: string;

    /**
     * Joins the title segments. Defaults to `' · '`.
     */
    readonly separator?: string;

    /**
     * The route data key carrying the title. Defaults to `'title'`.
     */
    readonly titleDataKey?: string;

    /**
     * The route data key carrying the meta description. Defaults to `'description'`.
     */
    readonly descriptionDataKey?: string;

    // #endregion
}
