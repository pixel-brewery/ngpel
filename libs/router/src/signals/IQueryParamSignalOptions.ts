// #region Imports

import type { IUrlParamNavigationOptions } from './IUrlParamNavigationOptions';

// #endregion

/**
 * Configures a query-parameter signal.
 *
 * @public
 */
export interface IQueryParamSignalOptions extends IUrlParamNavigationOptions {
    // #region Properties

    /**
     * Keeps the URL fragment across the navigation. Defaults to `true`, because a query parameter
     * change is a refinement of the current view and must not drop its scroll anchor.
     */
    readonly preserveFragment?: boolean;

    // #endregion
}
