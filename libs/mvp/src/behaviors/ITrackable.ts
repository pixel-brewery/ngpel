// #region Imports

import type { Signal } from '@angular/core';
import type { Command } from '../commands/Command';

// #endregion

/**
 * Commands and gates of a presenter whose model has undo and redo history.
 *
 * @public
 */
export interface ITrackable {
    // #region Properties

    /**
     * Command that restores the preceding recorded model value.
     */
    readonly undoCommand: Command<void>;

    /**
     * Command that restores the next value after an undo.
     */
    readonly redoCommand: Command<void>;

    /**
     * Whether an earlier recorded model value can be restored.
     */
    readonly canUndo: Signal<boolean>;

    /**
     * Whether an undone model value can be restored.
     */
    readonly canRedo: Signal<boolean>;

    // #endregion
}
