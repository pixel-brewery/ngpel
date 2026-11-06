// #region Imports

import { ErrorHandler, inject, Injectable } from '@angular/core';
import { IOperationContext } from '../interfaces/IOperationContext';
import { OperationLifecycle } from '../lifecycle/OperationLifecycle';
import { IOperationEntry } from '../models/IOperationEntry';
import { IOperationFailurePolicy } from '../policies/interfaces/IOperationFailurePolicy';
import { OPERATION_CLOCK, OPERATION_FAILURE_POLICY, OPERATION_LIFECYCLE } from '../provider/OperationQueueTokens';
import { IOperationClock } from '../scheduling/interfaces/IOperationClock';
import { IOperationStateStore } from './interfaces/IOperationStateStore';
import { OperationStateStore } from './OperationStateStore';

// #endregion

/**
 * Executes the commit and rollback lifecycle of operation entries.
 *
 * @public
 */
@Injectable()
export class OperationExecutor {
    // #region Fields

    private readonly _stateStore: IOperationStateStore = inject(OperationStateStore);
    private readonly _failurePolicy: IOperationFailurePolicy = inject(OPERATION_FAILURE_POLICY);
    private readonly _clock: IOperationClock = inject(OPERATION_CLOCK);
    private readonly _lifecycle: OperationLifecycle | null = inject(OPERATION_LIFECYCLE, { optional: true });
    private readonly _errorHandler = inject(ErrorHandler);

    // #endregion

    // #region Methods

    /**
     * Commits an operation entry by id.
     * Transitions through `committing` → `committed` on success,
     * or `failed` on error with the failure policy invoked.
     *
     * @param entryId - ID of the entry to commit.
     * @public
     */
    public async commit(entryId: string): Promise<void> {
        const entry: IOperationEntry | undefined = this._stateStore.find(entryId);

        if (!entry || !this.canCommit(entry)) {
            return;
        }

        this._stateStore.patch(entryId, {
            status: 'committing',
            remainingMilliseconds: 0,
        });

        const context = this.createContext(entry);
        let result: unknown;
        try {
            result = await entry.operation.commit(context);
        } catch (error: unknown) {
            this._stateStore.patch(entryId, {
                status: 'failed',
                failedAt: this._clock.now(),
                error,
            });

            this.runHook(() => entry.operation.onFailed?.(error, context));
            this._lifecycle?.emit({ kind: 'failed', entry, error });
            this._failurePolicy.handle(entry, error);
            return;
        }

        this._stateStore.patch(entryId, {
            status: 'committed',
            committedAt: this._clock.now(),
        });
        this.runHook(() => entry.operation.onCommitted?.(result, context));
        this._lifecycle?.emit({ kind: 'committed', entry, result });
        this._stateStore.remove(entryId);
    }

    /**
     * Rolls back an operation entry by id.
     * Transitions through `rejecting` → `rolling-back` → `rolled-back` → `rejected`,
     * then removes the entry from the store.
     *
     * @param entryId - ID of the entry to roll back.
     * @public
     */
    public rollback(entryId: string): void {
        const entry: IOperationEntry | undefined = this._stateStore.find(entryId);

        if (!entry || !this.canRollback(entry)) {
            return;
        }

        const context: IOperationContext = this.createContext(entry);

        this._stateStore.patch(entryId, {
            status: 'rejecting',
        });

        this._stateStore.patch(entryId, {
            status: 'rolling-back',
        });

        entry.operation.rollback(context);
        this.runHook(() => entry.operation.onRejected?.(context));

        this._lifecycle?.emit({ kind: 'rejected', entry });

        this._stateStore.patch(entryId, {
            status: 'rolled-back',
            rejectedAt: this._clock.now(),
        });

        this._stateStore.patch(entryId, {
            status: 'rejected',
        });

        this._stateStore.remove(entryId);
    }

    private canCommit(entry: IOperationEntry): boolean {
        return entry.status === 'pending' || entry.status === 'failed';
    }

    private canRollback(entry: IOperationEntry): boolean {
        return entry.status === 'pending' || entry.status === 'failed';
    }

    private runHook(callback: () => void): void {
        try {
            callback();
        } catch (error: unknown) {
            this._errorHandler.handleError(error);
        }
    }

    private createContext(entry: IOperationEntry): IOperationContext {
        return {
            entryId: entry.id,
            idempotencyKey: entry.id,
            operationType: entry.operation.type,
            requestedAt: entry.createdAt,
        };
    }

    // #endregion
}
