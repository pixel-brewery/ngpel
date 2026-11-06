// #region Imports

import type { Type } from '@angular/core';
import type { INavigationGuard } from '../INavigationGuard';

// #endregion

/**
 * Options of `withNavigationGuard(...)`.
 *
 * @public
 */
export interface IWithNavigationGuardOptions {
    // #region Properties

    /**
     * The stable id of this contribution, unique across every guard contribution of the
     * application.
     */
    readonly id: string;

    /**
     * The guard class; it is instantiated through DI, so it may inject the product's policy
     * services.
     */
    readonly guard: Type<INavigationGuard>;

    // #endregion
}
