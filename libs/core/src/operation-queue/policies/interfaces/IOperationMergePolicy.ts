// #region Imports

import { IOperation } from '../../interfaces/IOperation';
import { IOperationEntry } from '../../models/IOperationEntry';
import { IOperationPolicy } from './IOperationPolicy';

// #endregion

/**
 * Policy responsible for finding a merge target when a new operation is enqueued.
 *
 * @public
 */
export interface IOperationMergePolicy extends IOperationPolicy<'merge'> {
    /**
     * Returns the existing entry that should be replaced by the incoming operation,
     * or `undefined` if no merge should occur.
     *
     * @param entries - Current entries in the queue.
     * @param operation - The operation about to be enqueued.
     * @returns The entry to replace, or `undefined`.
     * @public
     */
    findMergeTarget(entries: ReadonlyArray<IOperationEntry>, operation: IOperation<unknown, unknown>): IOperationEntry | undefined;
}
