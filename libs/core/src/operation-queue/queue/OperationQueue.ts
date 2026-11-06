// #region Imports

import { inject, Injectable, Signal } from '@angular/core';
import { operation } from '../factory/operationFactory';
import { IOperationIdFactory } from '../identity/interfaces/IOperationIdFactory';
import { IOperation } from '../interfaces/IOperation';
import { IOperationContext } from '../interfaces/IOperationContext';
import { IOperationInput } from '../interfaces/IOperationInput';
import { IOperationQueueOptions } from '../interfaces/IOperationQueueOptions';
import { OperationLifecycle } from '../lifecycle/OperationLifecycle';
import { IOperationEntry } from '../models/IOperationEntry';
import { IOperationMergePolicy } from '../policies/interfaces/IOperationMergePolicy';
import { OPERATION_CLOCK, OPERATION_ID_FACTORY, OPERATION_LIFECYCLE, OPERATION_MERGE_POLICY, OPERATION_QUEUE_OPTIONS } from '../provider/OperationQueueTokens';
import { IOperationClock } from '../scheduling/interfaces/IOperationClock';
import { IOperationScheduler } from './interfaces/IOperationScheduler';
import { IOperationStateStore } from './interfaces/IOperationStateStore';
import { OperationExecutor } from './OperationExecutor';
import { OperationScheduler } from './OperationScheduler';
import { OperationStateStore } from './OperationStateStore';

// #endregion

/**
 * Central operation queue managing enqueue, scheduling, commit, and rollback lifecycle.
 *
 * Exposes reactive signals for the current entry state. Operations are enqueued
 * with a countdown delay; when it expires they are committed automatically.
 * Entries can also be committed immediately, retried, rejected, or dismissed.
 *
 * @public
 */
@Injectable()
export class OperationQueue {
    // #region Fields

    private readonly _stateStore: IOperationStateStore = inject(OperationStateStore);
    private readonly _scheduler: IOperationScheduler = inject(OperationScheduler);
    private readonly _executor: OperationExecutor = inject(OperationExecutor);
    private readonly _idFactory: IOperationIdFactory = inject(OPERATION_ID_FACTORY);
    private readonly _clock: IOperationClock = inject(OPERATION_CLOCK);
    private readonly _options: IOperationQueueOptions = inject(OPERATION_QUEUE_OPTIONS);
    private readonly _mergePolicy: IOperationMergePolicy = inject(OPERATION_MERGE_POLICY);
    private readonly _lifecycle: OperationLifecycle | null = inject(OPERATION_LIFECYCLE, { optional: true });

    // #endregion

    // #region Properties

    /**
     * All entries currently in the queue.
     *
     * @public
     */
    public readonly entries: Signal<ReadonlyArray<IOperationEntry>> = this._stateStore.entries;

    /**
     * Entries with status `'pending'`.
     *
     * @public
     */
    public readonly pendingEntries: Signal<ReadonlyArray<IOperationEntry>> = this._stateStore.pendingEntries;

    /**
     * Entries with status `'failed'`.
     *
     * @public
     */
    public readonly failedEntries: Signal<ReadonlyArray<IOperationEntry>> = this._stateStore.failedEntries;

    /**
     * Entries not marked as dismissed.
     *
     * @public
     */
    public readonly visibleEntries: Signal<ReadonlyArray<IOperationEntry>> = this._stateStore.visibleEntries;

    // #endregion

    // #region Methods

    /**
     * Enqueues a new operation and returns its entry id.
     * If a merge target is found the existing entry is rejected first.
     *
     * Accepts either a full {@link IOperation} or a simplified
     * {@link IOperationDefinition} — only `commit` is required in the
     * simplified form. Missing fields are filled with sensible defaults.
     *
     * @param input - The operation or definition to enqueue.
     * @returns The generated entry id.
     * @public
     */
    public enqueue<TPayload, TResult>(input: IOperationInput<TPayload, TResult>): string {
        const resolved: IOperation<TPayload, TResult> = operation(input);

        const mergeTarget: IOperationEntry | undefined = this._mergePolicy.findMergeTarget(
            this._stateStore.entries(),
            resolved as IOperation<unknown, unknown>,
        );

        if (mergeTarget) {
            this.reject(mergeTarget.id);
        }

        const now: number = this._clock.now();
        const delay: number = resolved.delayInMilliseconds ?? this._options.defaultDelayInMilliseconds;
        const id: string = this._idFactory.create();

        const entry: IOperationEntry<TPayload, TResult> = {
            id,
            operation: resolved,
            status: 'pending',
            createdAt: now,
            commitAt: now + delay,
            delayInMilliseconds: delay,
            remainingMilliseconds: delay,
            dismissed: false,
        };

        resolved.apply(this.createContext(entry));
        this._stateStore.add(entry);
        this._lifecycle?.emit({ kind: 'enqueued', entry });
        this._scheduler.schedule(entry);

        return id;
    }

    /**
     * Rejects and rolls back an operation entry.
     *
     * @param entryId - ID of the entry to reject.
     * @public
     */
    public reject(entryId: string): void {
        this._scheduler.cancel(entryId);
        this._executor.rollback(entryId);
    }

    /**
     * Marks an entry as dismissed (hidden from {@link OperationQueue.visibleEntries}).
     *
     * @param entryId - ID of the entry to dismiss.
     * @public
     */
    public dismiss(entryId: string): void {
        const entry: IOperationEntry | undefined = this._stateStore.find(entryId);

        this._stateStore.patch(entryId, {
            dismissed: true,
        });

        if (entry) {
            this._lifecycle?.emit({ kind: 'dismissed', entry });
        }
    }

    /**
     * Immediately commits an operation, bypassing the countdown delay.
     *
     * @param entryId - ID of the entry to commit now.
     * @public
     */
    public commitNow(entryId: string): void {
        this._scheduler.cancel(entryId);
        void this._executor.commit(entryId);
    }

    /**
     * Retries a failed operation entry by re-attempting the commit.
     *
     * @param entryId - ID of the entry to retry.
     * @public
     */
    public retry(entryId: string): void {
        const entry: IOperationEntry | undefined = this._stateStore.find(entryId);

        if (entry?.status !== 'failed') {
            return;
        }

        void this._executor.commit(entryId);
        this._lifecycle?.emit({ kind: 'retried', entry });
    }

    /**
     * Clears all entries and cancels all pending schedules.
     *
     * @public
     */
    public clear(): void {
        this._scheduler.cancelAll();

        for (const entry of this._stateStore.entries()) {
            this._stateStore.remove(entry.id);
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
