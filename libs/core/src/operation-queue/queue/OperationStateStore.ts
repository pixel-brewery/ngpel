// #region Imports

import { computed, Injectable, signal } from '@angular/core';
import { IOperationEntry } from '../models/IOperationEntry';
import { IOperationStateStore } from './interfaces/IOperationStateStore';

// #endregion

/**
 * Signal-based state store for operation entries.
 * Provides reactive derived lists for pending, failed, and visible entries.
 *
 * @public
 */
@Injectable()
export class OperationStateStore implements IOperationStateStore {
    // #region Fields

    private readonly _entries = signal<ReadonlyArray<IOperationEntry>>([]);

    // #endregion

    // #region Properties

    /**
     * All entries currently in the queue.
     *
     * @public
     */
    public readonly entries = this._entries.asReadonly();

    /**
     * Entries with status `'pending'`.
     *
     * @public
     */
    public readonly pendingEntries = computed(() => this._entries().filter((entry: IOperationEntry): boolean => entry.status === 'pending'));

    /**
     * Entries with status `'failed'`.
     *
     * @public
     */
    public readonly failedEntries = computed(() => this._entries().filter((entry: IOperationEntry): boolean => entry.status === 'failed'));

    /**
     * Entries not marked as dismissed.
     *
     * @public
     */
    public readonly visibleEntries = computed(() => this._entries().filter((entry: IOperationEntry): boolean => !entry.dismissed));

    // #endregion

    // #region Methods

    /**
     * Appends a new entry to the store.
     *
     * @param entry - The entry to add.
     * @public
     */
    public add(entry: IOperationEntry): void {
        this._entries.update((entries: ReadonlyArray<IOperationEntry>): IOperationEntry[] => [...entries, entry]);
    }

    /**
     * Merges a partial patch into an existing entry.
     *
     * @param entryId - ID of the entry to patch.
     * @param patch - Partial fields to merge.
     * @public
     */
    public patch(entryId: string, patch: Partial<IOperationEntry>): void {
        this._entries.update((entries: ReadonlyArray<IOperationEntry>): IOperationEntry[] =>
            entries.map((entry: IOperationEntry): IOperationEntry => (entry.id === entryId ? { ...entry, ...patch } : entry)),
        );
    }

    /**
     * Removes an entry from the store.
     *
     * @param entryId - ID of the entry to remove.
     * @public
     */
    public remove(entryId: string): void {
        this._entries.update((entries: ReadonlyArray<IOperationEntry>): IOperationEntry[] =>
            entries.filter((entry: IOperationEntry): boolean => entry.id !== entryId),
        );
    }

    /**
     * Finds an entry by ID or returns `undefined`.
     *
     * @param entryId - ID to look up.
     * @returns The matching entry, or `undefined`.
     * @public
     */
    public find(entryId: string): IOperationEntry | undefined {
        return this._entries().find((entry: IOperationEntry): boolean => entry.id === entryId);
    }

    // #endregion
}
