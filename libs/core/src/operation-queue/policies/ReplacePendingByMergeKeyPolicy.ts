// #region Imports

import { IOperation } from '../interfaces/IOperation';
import { IOperationEntry } from '../models/IOperationEntry';
import { OperationPolicy } from './abstracts/OperationPolicyBase';
import { IOperationMergePolicy } from './interfaces/IOperationMergePolicy';

// #endregion

/**
 * Merge policy that replaces the first pending entry sharing the same {@link IOperation.mergeKey}.
 *
 * @public
 */
export class ReplacePendingByMergeKeyPolicy extends OperationPolicy<'merge'> implements IOperationMergePolicy {
    // #region Ctor

    /**
     * Creates a new instance of the {@link ReplacePendingByMergeKeyPolicy} class.
     *
     * @public
     */
    public constructor() {
        super('merge', 'replace-pending-by-merge-key');
    }

    // #endregion

    // #region Methods

    /**
     * Finds the first pending entry whose merge key matches the incoming operation.
     *
     * @param entries - Current queue entries.
     * @param operation - Incoming operation.
     * @returns The matching pending entry, or `undefined` if none found.
     * @public
     */
    public findMergeTarget(entries: ReadonlyArray<IOperationEntry>, operation: IOperation<unknown, unknown>): IOperationEntry | undefined {
        if (!operation.mergeKey) {
            return undefined;
        }

        return entries.find((entry: IOperationEntry): boolean => entry.status === 'pending' && entry.operation.mergeKey === operation.mergeKey);
    }

    // #endregion
}
