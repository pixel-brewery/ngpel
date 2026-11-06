import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IOperationQueueOptions } from '../interfaces/IOperationQueueOptions';
import { IOperationEntry } from '../models/IOperationEntry';
import { IOperationFailurePolicy } from '../policies/interfaces/IOperationFailurePolicy';
import { IOperationMergePolicy } from '../policies/interfaces/IOperationMergePolicy';
import { OPERATION_CLOCK, OPERATION_FAILURE_POLICY, OPERATION_MERGE_POLICY, OPERATION_QUEUE_OPTIONS } from '../provider/OperationQueueTokens';
import { IOperationClock } from '../scheduling/interfaces/IOperationClock';
import { OperationExecutor } from './OperationExecutor';
import { OperationScheduler } from './OperationScheduler';
import { OperationStateStore } from './OperationStateStore';

describe('OperationScheduler', () => {
    const OPTIONS: IOperationQueueOptions = {
        defaultDelayInMilliseconds: 5000,
        countdownIntervalInMilliseconds: 1000,
    };

    beforeEach(() => {
        vi.useFakeTimers();
        TestBed.resetTestingModule();
    });

    function setup() {
        const clock: IOperationClock = { now: vi.fn().mockReturnValue(0) };
        const commitSpy = vi.fn().mockResolvedValue(undefined);
        const rollbackSpy = vi.fn();
        const mockFailurePolicy: IOperationFailurePolicy = {
            kind: 'failure',
            name: 'mock',
            priority: 0,
            handle: vi.fn(),
        };
        const mockMergePolicy: IOperationMergePolicy = {
            kind: 'merge',
            name: 'mock',
            priority: 0,
            findMergeTarget: vi.fn().mockReturnValue(undefined),
        };

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                OperationStateStore,
                OperationScheduler,
                {
                    provide: OperationExecutor,
                    useValue: { commit: commitSpy, rollback: rollbackSpy },
                },
                { provide: OPERATION_CLOCK, useValue: clock },
                { provide: OPERATION_QUEUE_OPTIONS, useValue: OPTIONS },
                { provide: OPERATION_FAILURE_POLICY, useValue: mockFailurePolicy },
                { provide: OPERATION_MERGE_POLICY, useValue: mockMergePolicy },
            ],
        });

        return {
            scheduler: TestBed.inject(OperationScheduler),
            stateStore: TestBed.inject(OperationStateStore),
            clock,
            commitSpy,
        };
    }

    it('should create an instance', () => {
        // arrange
        const { scheduler } = setup();

        // act
        // assert
        expect(scheduler).toBeInstanceOf(OperationScheduler);
    });

    describe('schedule', () => {
        it('should update remainingMilliseconds on each tick', () => {
            // arrange
            const { scheduler, stateStore, clock } = setup();
            const entry = createEntry({ id: 'e1', delayInMilliseconds: 3000 });
            stateStore.add(entry);
            vi.mocked(clock.now).mockReturnValue(0);

            // act
            scheduler.schedule(entry);

            // assert - tick to 1s
            vi.mocked(clock.now).mockReturnValue(1000);
            vi.advanceTimersByTime(1000);
            const patchedEntry = stateStore.find('e1');
            expect(patchedEntry?.remainingMilliseconds).toBe(2000);
        });

        it('should commit when countdown reaches zero', () => {
            // arrange
            const { scheduler, stateStore, clock, commitSpy } = setup();
            const entry = createEntry({ id: 'e1', delayInMilliseconds: 2000 });
            stateStore.add(entry);
            vi.mocked(clock.now).mockReturnValue(0);

            // act
            scheduler.schedule(entry);

            // assert - advance to zero remaining
            vi.mocked(clock.now).mockReturnValue(2000);
            vi.advanceTimersByTime(2000);
            expect(commitSpy).toHaveBeenCalledWith('e1');
        });

        it('should cancel existing subscription when scheduling the same entry again', () => {
            // arrange
            const { scheduler, stateStore, clock, commitSpy } = setup();
            const entry = createEntry({ id: 'e1', delayInMilliseconds: 5000 });
            stateStore.add(entry);
            vi.mocked(clock.now).mockReturnValue(0);

            // act
            scheduler.schedule(entry);
            scheduler.schedule(entry);

            // assert - only one subscription, commit once at 5000ms
            vi.mocked(clock.now).mockReturnValue(5000);
            vi.advanceTimersByTime(5000);
            expect(commitSpy).toHaveBeenCalledWith('e1');
        });
    });

    describe('cancel', () => {
        it('should stop countdown for a specific entry', () => {
            // arrange
            const { scheduler, stateStore, clock, commitSpy } = setup();
            const entry = createEntry({ id: 'e1', delayInMilliseconds: 3000 });
            stateStore.add(entry);
            vi.mocked(clock.now).mockReturnValue(0);
            scheduler.schedule(entry);

            // act
            scheduler.cancel('e1');

            // assert
            vi.mocked(clock.now).mockReturnValue(3000);
            vi.advanceTimersByTime(3000);
            expect(commitSpy).not.toHaveBeenCalled();
        });

        it('should do nothing when cancelling a nonexistent entry', () => {
            // arrange
            const { scheduler, commitSpy } = setup();

            // act
            scheduler.cancel('nonexistent');

            // assert
            expect(commitSpy).not.toHaveBeenCalled();
        });
    });

    describe('cancelAll', () => {
        it('should stop all countdowns', () => {
            // arrange
            const { scheduler, stateStore, clock, commitSpy } = setup();
            const e1 = createEntry({ id: 'e1', delayInMilliseconds: 2000 });
            const e2 = createEntry({ id: 'e2', delayInMilliseconds: 2000 });
            stateStore.add(e1);
            stateStore.add(e2);
            vi.mocked(clock.now).mockReturnValue(0);
            scheduler.schedule(e1);
            scheduler.schedule(e2);

            // act
            scheduler.cancelAll();

            // assert
            vi.mocked(clock.now).mockReturnValue(2000);
            vi.advanceTimersByTime(2000);
            expect(commitSpy).not.toHaveBeenCalled();
        });
    });

    describe('status change during countdown', () => {
        it('should cancel countdown when entry is no longer pending', () => {
            // arrange
            const { scheduler, stateStore, clock, commitSpy } = setup();
            const entry = createEntry({ id: 'e1', delayInMilliseconds: 3000 });
            stateStore.add(entry);
            vi.mocked(clock.now).mockReturnValue(0);
            scheduler.schedule(entry);

            // act - remove entry mid-countdown
            stateStore.remove('e1');
            vi.mocked(clock.now).mockReturnValue(1000);
            vi.advanceTimersByTime(1000);

            // assert
            vi.mocked(clock.now).mockReturnValue(3000);
            vi.advanceTimersByTime(2000);
            expect(commitSpy).not.toHaveBeenCalled();
        });
    });

    function createEntry(partial: Partial<IOperationEntry> & { id: string }): IOperationEntry {
        return {
            operation: {
                type: 'test-op',
                payload: undefined,
                label: 'Test',
                apply: vi.fn(),
                commit: vi.fn().mockResolvedValue(undefined),
                rollback: vi.fn(),
            },
            status: 'pending',
            createdAt: 0,
            commitAt: 0,
            delayInMilliseconds: 5000,
            remainingMilliseconds: 5000,
            dismissed: false,
            ...partial,
        };
    }
});
