// #region Imports

import type { ActivatedRoute, Router } from '@angular/router';

// #endregion

/**
 * Everything required to build the destination URL for a changed route parameter.
 *
 * @typeParam T The typed application value.
 * @public
 */
export interface IRouteParamNavigationContext<T> {
    // #region Properties

    /**
     * The requested value, or `undefined` when the parameter is being cleared.
     */
    readonly value: T | undefined;

    /**
     * The serialized representation of {@link IRouteParamNavigationContext.value}; `undefined`
     * when the parameter is being cleared or the codec serialized it to `null`.
     */
    readonly serializedValue: string | undefined;

    /**
     * The router, for `createUrlTree(...)`.
     */
    readonly router: Router;

    /**
     * The route the signal was created in, for relative URL trees.
     */
    readonly route: ActivatedRoute;

    // #endregion
}
