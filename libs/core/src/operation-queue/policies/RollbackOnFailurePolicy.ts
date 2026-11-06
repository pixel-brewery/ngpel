// #region Imports

import { inject, Injector } from '@angular/core';
import { IOperationEntry } from '../models/IOperationEntry';
import { OperationExecutor } from '../queue/OperationExecutor';
import { OperationPolicy } from './abstracts/OperationPolicyBase';
import { IOperationFailurePolicy } from './interfaces/IOperationFailurePolicy';

// #endregion

/**
 * Failure policy that rolls back the failed operation via {@link OperationExecutor.rollback}.
 *
 * @public
 */
export class RollbackOnFailurePolicy extends OperationPolicy<'failure'> implements IOperationFailurePolicy {
    // #region Fields

    private readonly _injector = inject(Injector);

    // #endregion

    // #region Ctor

    /**
     * Creates a new instance of the {@link RollbackOnFailurePolicy} class.
     *
     * @public
     */
    public constructor() {
        super('failure', 'rollback-on-failure');
    }

    // #endregion

    // #region Methods

    /**
     * Triggers a rollback for the failed entry.
     *
     * @param entry - The entry to roll back.
     * @param _error - The captured error (unused).
     * @public
     */
    public handle(entry: IOperationEntry, _error: unknown): void {
        this._injector.get(OperationExecutor).rollback(entry.id);
    }

    // #endregion
}
