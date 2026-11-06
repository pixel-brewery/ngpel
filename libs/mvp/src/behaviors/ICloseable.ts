// #region Imports

import type { Signal } from '@angular/core';
import type { Command } from '../commands/Command';

// #endregion

/**
 * Contract of the Closeable presenter behavior: the command a View binds to its dismiss affordance,
 * together with the gate that decides whether dismissing is currently allowed.
 *
 * @public
 */
export interface ICloseable {
    // #region Properties

    /**
     * Command that closes the presenter, for example dismissing a drawer or a dialog.
     */
    readonly closeCommand: Command<void>;

    /**
     * Whether {@link ICloseable.closeCommand} can currently execute.
     */
    readonly canClose: Signal<boolean>;

    // #endregion

    // #region Methods

    /**
     * Runs when the close command executes. Override to perform the actual close.
     *
     * @remarks
     * Public because TypeScript mixins cannot declare protected extension points. It is a subclass
     * extension point — do not call it from a template.
     */
    onExecuteClose(): void;

    /**
     * Enables or disables closing.
     *
     * @param value `true` to allow closing, `false` to block it.
     */
    setCanExecuteClose(value: boolean): void;

    // #endregion
}
