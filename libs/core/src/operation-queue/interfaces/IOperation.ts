// #region Imports

import { IOperationContext } from './IOperationContext';

// #endregion

/**
 * Contract for a queued operation that can apply, commit, and rollback.
 *
 * @typeParam TPayload - The input data required by the operation.
 * @typeParam TResult - The result produced by a successful commit.
 * @public
 */
export interface IOperation<TPayload, TResult = void> {
    /**
     * Discriminator for operation type (e.g. `"create-user"`, `"send-email"`).
     *
     * @public
     */
    readonly type: string;

    /**
     * Input data passed to {@link commit} and {@link apply}.
     *
     * @public
     */
    readonly payload: TPayload;

    /**
     * Human-readable label shown in the UI countdown.
     *
     * @public
     */
    readonly label: string;

    /**
     * Optional override for the queue-level default delay in milliseconds.
     *
     * @public
     */
    readonly delayInMilliseconds?: number;

    /**
     * Optional merge key. Operations sharing the same key may be coalesced
     * by the active {@link IOperationMergePolicy}.
     *
     * @public
     */
    readonly mergeKey?: string;

    /**
     * Called immediately when the operation is enqueued (optimistic side-effect).
     *
     * @param context - Runtime context for this entry.
     * @public
     */
    apply(context: IOperationContext): void;

    /**
     * Performs the server-side mutation. Resolves on success, rejects on failure.
     *
     * @param context - Runtime context for this entry.
     * @returns The result of a successful commit.
     * @public
     */
    commit(context: IOperationContext): Promise<TResult>;

    /**
     * Reverts the optimistic side-effect when the operation is rejected or rolled back.
     *
     * @param context - Runtime context for this entry.
     * @public
     */
    rollback(context: IOperationContext): void;

    /**
     * Optional hook called after a successful commit.
     *
     * @param result - The value returned by {@link commit}.
     * @param context - Runtime context for this entry.
     * @public
     */
    onCommitted?(result: TResult, context: IOperationContext): void;

    /**
     * Optional hook called after a rollback completes.
     *
     * @param context - Runtime context for this entry.
     * @public
     */
    onRejected?(context: IOperationContext): void;

    /**
     * Optional hook called when {@link commit} throws.
     *
     * @param error - The error thrown by {@link commit}.
     * @param context - Runtime context for this entry.
     * @public
     */
    onFailed?(error: unknown, context: IOperationContext): void;
}
