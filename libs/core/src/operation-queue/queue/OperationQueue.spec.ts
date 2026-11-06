// #region Imports

import { createEnvironmentInjector, EnvironmentInjector, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { IOperationContext } from '../interfaces/IOperationContext';
import { OperationLifecycle } from '../lifecycle/OperationLifecycle';
import { ReplacePendingByMergeKeyPolicy } from '../policies/ReplacePendingByMergeKeyPolicy';
import { RollbackOnFailurePolicy } from '../policies/RollbackOnFailurePolicy';
import { provideOperationQueue } from '../provider/provideOperationQueue';
import { withFailurePolicy } from '../provider/withFailurePolicy';
import { withLifecycleEvents } from '../provider/withLifecycleEvents';
import { withMergePolicy } from '../provider/withMergePolicy';
import { OperationQueue } from './OperationQueue';

// #endregion

describe(OperationQueue.name, () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.useRealTimers();
    });

    it('can undo an optimistic update before the deadline without sending it', async () => {
        // arrange
        TestBed.configureTestingModule({ providers: [provideOperationQueue()] });
        const queue = TestBed.inject(OperationQueue);
        const commit = vi.fn(async () => undefined);
        const rollback = vi.fn();
        const id = queue.enqueue({ commit, rollback });

        // act
        queue.reject(id);
        await vi.advanceTimersByTimeAsync(8_000);

        // assert
        expect(commit).not.toHaveBeenCalled();
        expect(rollback).toHaveBeenCalledOnce();
        expect(queue.entries()).toEqual([]);
    });

    it('automatically commits when the countdown ends and reuses the mutation key on retry', async () => {
        // arrange
        TestBed.configureTestingModule({ providers: [provideOperationQueue({}, withLifecycleEvents())] });
        const queue = TestBed.inject(OperationQueue);
        const events: string[] = [];
        const subscription = TestBed.inject(OperationLifecycle).events.subscribe((event) => events.push(event.kind));
        const commit = vi
            .fn<(context: IOperationContext) => Promise<void>>()
            .mockRejectedValueOnce(new Error('connection interrupted'))
            .mockResolvedValueOnce(undefined);
        const id = queue.enqueue({ commit });
        await vi.advanceTimersByTimeAsync(8_000);

        // act
        queue.retry(id);
        await vi.advanceTimersByTimeAsync(0);

        // assert
        expect(commit.mock.calls.map(([context]) => context.idempotencyKey)).toEqual([id, id]);
        expect(events).toEqual(['enqueued', 'failed', 'retried', 'committed']);
        expect(queue.entries()).toEqual([]);
        subscription.unsubscribe();
    });

    it('does not treat an exception in a completion hook as a failed mutation', async () => {
        // arrange
        const error = new Error('refresh failed');
        const handleError = vi.fn();
        TestBed.configureTestingModule({
            providers: [provideOperationQueue(), { provide: ErrorHandler, useValue: { handleError } }],
        });
        const queue = TestBed.inject(OperationQueue);
        const onFailed = vi.fn();
        const id = queue.enqueue({
            commit: async () => 'saved',
            onCommitted: () => {
                throw error;
            },
            onFailed,
        });

        // act
        queue.commitNow(id);
        await vi.advanceTimersByTimeAsync(0);

        // assert
        expect(handleError).toHaveBeenCalledWith(error);
        expect(onFailed).not.toHaveBeenCalled();
        expect(queue.entries()).toEqual([]);
    });

    it('can roll back the optimistic update after a failed mutation when configured', async () => {
        // arrange
        TestBed.configureTestingModule({
            providers: [provideOperationQueue({ defaultDelayInMilliseconds: 0 }, withFailurePolicy(RollbackOnFailurePolicy))],
        });
        const queue = TestBed.inject(OperationQueue);
        const rollback = vi.fn();
        queue.enqueue({ commit: () => Promise.reject(new Error('rejected')), rollback });

        // act
        await vi.advanceTimersByTimeAsync(0);

        // assert
        expect(rollback).toHaveBeenCalledOnce();
        expect(queue.entries()).toEqual([]);
    });

    it('replaces a pending mutation with the same merge key and keeps the new value', async () => {
        // arrange
        TestBed.configureTestingModule({
            providers: [provideOperationQueue({}, withMergePolicy(ReplacePendingByMergeKeyPolicy))],
        });
        const queue = TestBed.inject(OperationQueue);
        const first = vi.fn(async () => undefined);
        const rollback = vi.fn();
        const latest = vi.fn(async () => undefined);
        queue.enqueue({ mergeKey: 'record', commit: first, rollback });

        // act
        queue.enqueue({ mergeKey: 'record', commit: latest });
        await vi.advanceTimersByTimeAsync(8_000);

        // assert
        expect(rollback).toHaveBeenCalledOnce();
        expect(first).not.toHaveBeenCalled();
        expect(latest).toHaveBeenCalledOnce();
    });

    it('cancels pending timers when the providing injector is destroyed', async () => {
        // arrange
        const injector = createEnvironmentInjector([provideOperationQueue()], TestBed.inject(EnvironmentInjector));
        const commit = vi.fn(async () => undefined);
        injector.get(OperationQueue).enqueue({ commit });

        // act
        injector.destroy();
        await vi.advanceTimersByTimeAsync(8_000);

        // assert
        expect(commit).not.toHaveBeenCalled();
    });
});
