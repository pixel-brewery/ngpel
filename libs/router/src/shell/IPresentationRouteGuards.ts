// #region Imports

import type { Route } from '@angular/router';

// #endregion

/**
 * The guards protecting the presentation shell route.
 *
 * @public
 */
export interface IPresentationRouteGuards {
    // #region Properties

    /**
     * Guards run before the shell is activated, typically an authentication guard.
     */
    readonly canActivate?: Route['canActivate'];

    /**
     * Guards run before the shell route is matched at all, so an unauthenticated visitor falls
     * through to a public route instead of being redirected.
     */
    readonly canMatch?: Route['canMatch'];

    // #endregion
}
