// #region Imports

import { IOperationEntry } from '../models/IOperationEntry';
import { OperationPolicy } from './abstracts/OperationPolicyBase';
import { IOperationFailurePolicy } from './interfaces/IOperationFailurePolicy';

// #endregion

/**
 * Failure policy that intentionally does nothing.
 * The operation remains in its optimistic state after a failure.
 *
 * @public
 */
export class KeepOptimisticOnFailurePolicy extends OperationPolicy<'failure'> implements IOperationFailurePolicy {
    // #region Ctor

    /**
     * Creates a new instance of the {@link KeepOptimisticOnFailurePolicy} class.
     *
     * @public
     */
    public constructor() {
        super('failure', 'keep-optimistic-on-failure');
    }

    // #endregion

    // #region Methods

    /**
     * No-op handler — keeps the optimistic state intact.
     *
     * @param _entry - The failed entry (unused).
     * @param _error - The captured error (unused).
     * @public
     */
    public handle(_entry: IOperationEntry, _error: unknown): void {
        // intentionally empty
    }

    // #endregion
}
