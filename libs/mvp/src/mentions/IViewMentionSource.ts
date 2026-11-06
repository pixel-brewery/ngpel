// #region Imports

import type { IViewMentionOption } from './IViewMentionOption';

// #endregion

/**
 * Supplies an active view's loaded resources without fetching new suggestion data.
 *
 * @public
 */
export interface IViewMentionSource {
    // #region Properties

    /**
     * Stable application-owned key identifying the contributing view.
     */
    readonly viewKey: string;

    /**
     * Route path that owns the source, including any nested routes.
     */
    readonly routePrefix: string;

    // #endregion

    // #region Methods

    /**
     * Returns the resources currently loaded by the view.
     *
     * @returns The current resource projection.
     */
    items(): ReadonlyArray<IViewMentionOption>;

    // #endregion
}
