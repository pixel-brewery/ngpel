// #region Imports

import type { Route } from '@angular/router';
import type { IPresentationRouteGuards } from './IPresentationRouteGuards';

// #endregion

/**
 * Options of `presentationRoutes(...)`.
 *
 * @public
 */
export interface IPresentationRoutesOptions {
    // #region Properties

    /**
     * Loads the shell component the feature routes are rendered inside. The shell itself stays in
     * the product: it composes the brand, the search launcher and everything else this package has
     * no opinion about. Pass a dynamic import for a lazy shell, or `() => AppShellView` for an
     * eager one.
     */
    readonly shell: NonNullable<Route['loadComponent']>;

    /**
     * The path segment the shell is mounted at. Defaults to `'main'`.
     */
    readonly path?: string;

    /**
     * The child route the empty path redirects to, for example `'explore'`. Without it the shell
     * has no default child.
     */
    readonly redirectTo?: string;

    /**
     * The guards protecting the shell route.
     */
    readonly guards?: IPresentationRouteGuards;

    /**
     * Static data attached to the shell route.
     */
    readonly data?: Route['data'];

    // #endregion
}
