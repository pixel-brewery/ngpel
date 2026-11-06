// #region Imports

import type { Signal } from '@angular/core';
import type { Command } from '../commands/Command';

// #endregion

/**
 * Contract for a presenter whose current projection can be reloaded on demand.
 *
 * @public
 */
export interface IRefreshable {
    // #region Properties

    /**
     * Command that reloads the presenter's current projection.
     */
    readonly refreshCommand: Command<void>;

    /**
     * Whether a refresh can start without overlapping an active load.
     */
    readonly canRefresh: Signal<boolean>;

    // #endregion

    // #region Methods

    /**
     * Reloads the current projection when the refresh command executes.
     *
     * @remarks
     * Public because TypeScript mixins cannot declare protected extension points. Override in a
     * concrete presenter; Views invoke {@link IRefreshable.refreshCommand} instead.
     */
    onExecuteRefresh(): void;

    // #endregion
}
