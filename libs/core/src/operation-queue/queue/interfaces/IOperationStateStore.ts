// #region Imports

import { Signal } from '@angular/core';
import { IOperationEntry } from '../../models/IOperationEntry';

// #endregion

/**
 * Reactive state store for operation entries.
 *
 * @public
 */
export interface IOperationStateStore {
    /**
     * All entries currently in the queue.
     *
     * @public
     */
    readonly entries: Signal<ReadonlyArray<IOperationEntry>>;

    /**
     * Entries with status `'pending'`.
     *
     * @public
     */
    readonly pendingEntries: Signal<ReadonlyArray<IOperationEntry>>;

    /**
     * Entries with status `'failed'`.
     *
     * @public
     */
    readonly failedEntries: Signal<ReadonlyArray<IOperationEntry>>;

    /**
     * Entries not marked as dismissed.
     *
     * @public
     */
    readonly visibleEntries: Signal<ReadonlyArray<IOperationEntry>>;

    /**
     * Appends a new entry to the store.
     *
     * @param entry - The entry to add.
     * @public
     */
    add(entry: IOperationEntry): void;

    /**
     * Merges a partial patch into an existing entry.
     *
     * @param entryId - ID of the entry to patch.
     * @param patch - Partial fields to merge.
     * @public
     */
    patch(entryId: string, patch: Partial<IOperationEntry>): void;

    /**
     * Removes an entry from the store.
     *
     * @param entryId - ID of the entry to remove.
     * @public
     */
    remove(entryId: string): void;

    /**
     * Finds an entry by ID or returns `undefined`.
     *
     * @param entryId - ID to look up.
     * @returns The matching entry, or `undefined`.
     * @public
     */
    find(entryId: string): IOperationEntry | undefined;
}
