// #region Imports

import type { UrlTree } from '@angular/router';
import type { IRouteParamNavigationContext } from './IRouteParamNavigationContext';
import type { IUrlParamNavigationOptions } from './IUrlParamNavigationOptions';

// #endregion

/**
 * Configures a route-parameter signal. The destination is explicit because changing one route
 * parameter can mean detail navigation, edit navigation, preview navigation or a return to the
 * parent view, and only the caller knows which.
 *
 * @typeParam T The typed application value.
 * @public
 */
export interface IRouteParamSignalOptions<T> extends IUrlParamNavigationOptions {
    // #region Methods

    /**
     * Builds the destination URL for a requested value.
     *
     * @param context The requested value and the router context.
     * @returns The URL tree to navigate to.
     */
    toUrlTree(context: IRouteParamNavigationContext<T>): UrlTree;

    // #endregion
}
