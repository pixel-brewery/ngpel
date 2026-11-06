// #region Imports

import type { INavItem } from '../INavItem';

// #endregion

/**
 * Options of `withNavigationItems(...)`.
 *
 * @public
 */
export interface IWithNavigationItemsOptions {
    // #region Properties

    /**
     * The stable id of this contribution, unique across every navigation contribution of the
     * application; it is what makes a duplicate registration a composition error instead of a
     * silent duplicate menu entry.
     */
    readonly id: string;

    /**
     * The contributed items.
     */
    readonly items: INavItem | ReadonlyArray<INavItem>;

    /**
     * The order applied to every contributed item that declares none. Composition roots order
     * whole feature contributions with it, instead of every feature library baking a number into
     * its own items.
     */
    readonly order?: number;

    // #endregion
}
