// #region Imports

import { inject, Injectable, type OnDestroy } from '@angular/core';
import { interval, startWith, Subscription, takeWhile } from 'rxjs';
import { IOperationQueueOptions } from '../interfaces/IOperationQueueOptions';
import { IOperationEntry } from '../models/IOperationEntry';
import { OPERATION_CLOCK, OPERATION_QUEUE_OPTIONS } from '../provider/OperationQueueTokens';
import { IOperationClock } from '../scheduling/interfaces/IOperationClock';
import { IOperationScheduler } from './interfaces/IOperationScheduler';
import { IOperationStateStore } from './interfaces/IOperationStateStore';
import { OperationExecutor } from './OperationExecutor';
import { OperationStateStore } from './OperationStateStore';

// #endregion

/**
 * Schedules operation entries for delayed execution using countdown intervals.
 * On each tick the remaining time is decremented; when it reaches zero the entry
 * is committed automatically via {@link OperationExecutor}.
 *
 * @public
 */
@Injectable()
export class OperationScheduler implements IOperationScheduler, OnDestroy {
    // #region Fields

    private readonly _stateStore: IOperationStateStore = inject(OperationStateStore);
    private readonly _executor: OperationExecutor = inject(OperationExecutor);
    private readonly _clock: IOperationClock = inject(OPERATION_CLOCK);
    private readonly _options: IOperationQueueOptions = inject(OPERATION_QUEUE_OPTIONS);
    private readonly _subscriptions = new Map<string, Subscription>();

    // #endregion

    // #region Methods

    /**
     * Starts a countdown for the given entry. When it expires the entry is committed.
     *
     * @param entry - The entry to schedule.
     * @public
     */
    public schedule(entry: IOperationEntry): void {
        this.cancel(entry.id);

        if (this._stateStore.find(entry.id)?.status !== 'pending') {
            return;
        }

        const startedAt: number = this._clock.now();
        const delay: number = entry.delayInMilliseconds;
        const intervalMs: number = this._options.countdownIntervalInMilliseconds;

        const subscription: Subscription = interval(intervalMs)
            .pipe(
                startWith(0),
                takeWhile((): boolean => this._clock.now() - startedAt < delay, true),
            )
            .subscribe((): void => {
                const currentEntry: IOperationEntry | undefined = this._stateStore.find(entry.id);

                if (!currentEntry || currentEntry.status !== 'pending') {
                    this.cancel(entry.id);
                    return;
                }

                const elapsed: number = this._clock.now() - startedAt;
                const remaining: number = Math.max(0, delay - elapsed);

                this._stateStore.patch(entry.id, {
                    remainingMilliseconds: remaining,
                });

                if (remaining === 0) {
                    this.cancel(entry.id);
                    void this._executor.commit(entry.id);
                }
            });

        if (!subscription.closed) {
            this._subscriptions.set(entry.id, subscription);
        }
    }

    /**
     * Cancels a pending countdown and releases the associated subscription.
     *
     * @param entryId - ID of the entry to cancel.
     * @public
     */
    public cancel(entryId: string): void {
        const subscription: Subscription | undefined = this._subscriptions.get(entryId);

        if (!subscription) {
            return;
        }

        subscription.unsubscribe();
        this._subscriptions.delete(entryId);
    }

    /**
     * Cancels all pending countdowns.
     *
     * @public
     */
    public cancelAll(): void {
        for (const subscription of this._subscriptions.values()) {
            subscription.unsubscribe();
        }

        this._subscriptions.clear();
    }

    /** Cancels scheduled work when the queue injector is destroyed. */
    public ngOnDestroy(): void {
        this.cancelAll();
    }

    // #endregion
}
