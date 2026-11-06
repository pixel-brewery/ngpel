// #region Imports

import type { Signal, WritableSignal } from '@angular/core';
import type { ITrackableSignalRecord } from './ITrackableSignalRecord';

// #endregion

/**
 * A writable signal with a bounded history and undo/redo operations.
 *
 * @public
 * @typeParam T The signal value type.
 */
export interface ITrackableSignal<T> {
    // #region Properties

    /**
     * The underlying writable signal; its `set()` and `update()` methods record changes.
     */
    readonly value: WritableSignal<T>;

    /**
     * Recorded snapshots from oldest to newest, including the current history position.
     */
    readonly history: Signal<Array<ITrackableSignalRecord<T>>>;

    /**
     * Whether a previous snapshot can be restored.
     */
    readonly canUndo: Signal<boolean>;

    /**
     * Whether an undone snapshot can be restored.
     */
    readonly canRedo: Signal<boolean>;

    // #endregion

    // #region Methods

    /**
     * Restores the preceding recorded value when one exists.
     */
    undo(): void;

    /**
     * Restores the next undone value when one exists.
     */
    redo(): void;

    /**
     * Retains only the latest recorded value and discards the redo history.
     */
    reset(): void;

    /**
     * Discards all snapshots without changing the signal value.
     */
    clear(): void;

    // #endregion
}
