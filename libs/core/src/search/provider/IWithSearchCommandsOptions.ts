// #region Imports

import type { Type } from '@angular/core';
import type { ICommandItem } from '../models/ICommandItem';
import type { ICommandSource } from '../models/ICommandSource';

// #endregion

/**
 * Options for contributing palette commands through `withSearchCommands()`.
 *
 * @public
 */
export interface IWithSearchCommandsOptions {
    // #region Properties

    /**
     * Stable unique id of this contribution (unique among all command features).
     */
    readonly id: string;

    /**
     * Static commands to contribute.
     */
    readonly commands?: ReadonlyArray<ICommandItem>;

    /**
     * Injectable classes contributing commands dynamically. Each class is registered as itself and
     * as a source, so it can inject services (a router, a permission service) and be injected in
     * turn.
     */
    readonly sources?: ReadonlyArray<Type<ICommandSource>>;

    // #endregion
}
