// #region Imports

import { IOperationEntry } from '../../models/IOperationEntry';

// #endregion

/**
 * Handles delayed scheduling of operation entries.
 *
 * @public
 */
export interface IOperationScheduler {
    /**
     * Starts a countdown for the given entry. When it expires the entry is committed.
     *
     * @param entry - The entry to schedule.
     * @public
     */
    schedule(entry: IOperationEntry): void;

    /**
     * Cancels a pending countdown and releases associated resources.
     *
     * @param entryId - ID of the entry to cancel.
     * @public
     */
    cancel(entryId: string): void;

    /**
     * Cancels all pending countdowns.
     *
     * @public
     */
    cancelAll(): void;
}
