// #region Imports

import { IOperationEntry } from '../../models/IOperationEntry';
import { IOperationPolicy } from './IOperationPolicy';

// #endregion

/**
 * Policy invoked when {@link OperationExecutor.commit} throws.
 *
 * @public
 */
export interface IOperationFailurePolicy extends IOperationPolicy<'failure'> {
    /**
     * Handles a failed operation entry.
     *
     * @param entry - The entry that failed.
     * @param error - The error thrown by {@link IOperation.commit}.
     * @public
     */
    handle(entry: IOperationEntry, error: unknown): void;
}
