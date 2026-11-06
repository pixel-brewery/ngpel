// #region Imports

import { IOperation } from '../interfaces/IOperation';
import { OperationStatus } from './OperationStatus';

// #endregion

/**
 * Internal representation of a queued operation with its lifecycle state.
 *
 * @typeParam TPayload - The input data required by the operation.
 * @typeParam TResult - The result produced by a successful commit.
 * @public
 */
export interface IOperationEntry<TPayload = unknown, TResult = unknown> {
    /**
     * Unique identifier for this entry.
     *
     * @public
     */
    readonly id: string;

    /**
     * The operation to execute.
     *
     * @public
     */
    readonly operation: IOperation<TPayload, TResult>;

    /**
     * Current lifecycle status.
     *
     * @public
     */
    readonly status: OperationStatus;

    /**
     * Timestamp (ms) when the entry was created.
     *
     * @public
     */
    readonly createdAt: number;

    /**
     * Timestamp (ms) when the entry should be auto-committed.
     *
     * @public
     */
    readonly commitAt: number;

    /**
     * Configured delay in milliseconds.
     *
     * @public
     */
    readonly delayInMilliseconds: number;

    /**
     * Countdown value updated by the scheduler on each tick.
     *
     * @public
     */
    readonly remainingMilliseconds: number;

    /**
     * When true the entry is hidden from {@link IOperationStateStore.visibleEntries}.
     *
     * @public
     */
    readonly dismissed: boolean;

    /**
     * Timestamp (ms) when the entry was successfully committed, if applicable.
     *
     * @public
     */
    readonly committedAt?: number;

    /**
     * Timestamp (ms) when the entry was rejected, if applicable.
     *
     * @public
     */
    readonly rejectedAt?: number;

    /**
     * Timestamp (ms) when the entry entered the failed state, if applicable.
     *
     * @public
     */
    readonly failedAt?: number;

    /**
     * Error captured from a failed {@link IOperation.commit}, if applicable.
     *
     * @public
     */
    readonly error?: unknown;
}
