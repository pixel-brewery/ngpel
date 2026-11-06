// #region Imports

import { IOperation } from '../interfaces/IOperation';
import { IOperationEntry } from '../models/IOperationEntry';
import { OperationPolicy } from './abstracts/OperationPolicyBase';
import { IOperationMergePolicy } from './interfaces/IOperationMergePolicy';

// #endregion

/**
 * Merge policy that never merges operations.
 * Every enqueued operation creates a new entry.
 *
 * @public
 */
export class NoOperationMergePolicy extends OperationPolicy<'merge'> implements IOperationMergePolicy {
    // #region Ctor

    /**
     * Creates a new instance of the {@link NoOperationMergePolicy} class.
     *
     * @public
     */
    public constructor() {
        super('merge', 'no-operation-merge');
    }

    // #endregion

    // #region Methods

    /**
     * Always returns `undefined` — no merge target is ever selected.
     *
     * @param _entries - Current queue entries (unused).
     * @param _operation - Incoming operation (unused).
     * @returns Always `undefined`.
     * @public
     */
    public findMergeTarget(_entries: ReadonlyArray<IOperationEntry>, _operation: IOperation<unknown, unknown>): IOperationEntry | undefined {
        return undefined;
    }

    // #endregion
}
