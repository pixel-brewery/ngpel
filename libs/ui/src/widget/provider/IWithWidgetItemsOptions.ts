// #region Imports

import type { IWidget } from '../models/IWidget';

// #endregion

/**
 * Options of `withWidgetItems(...)`.
 *
 * @public
 */
export interface IWithWidgetItemsOptions {
    // #region Properties

    /**
     * The stable id of this contribution, unique across every widget contribution of the
     * application; it is what turns a duplicate registration into a composition error instead of a
     * silently duplicated dashboard tile.
     */
    readonly id: string;

    /**
     * The contributed widgets, as factories. Each factory runs inside an injection context, so a
     * widget may resolve its title from a translation service or its availability from a
     * permission service while it is being built.
     */
    readonly widgets: ReadonlyArray<() => IWidget>;

    // #endregion
}
