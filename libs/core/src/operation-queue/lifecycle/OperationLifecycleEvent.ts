// #region Imports

import { IOperationEntry } from '../models/IOperationEntry';

// #endregion

/**
 * Discriminated union of all lifecycle events emitted by the operation queue.
 *
 * UI adapters subscribe to these events to react to operation state changes
 * without coupling to the queue internals.
 *
 * @public
 */
export type OperationLifecycleEvent =
    OperationEnqueuedEvent | OperationCommittedEvent | OperationFailedEvent | OperationRejectedEvent | OperationDismissedEvent | OperationRetriedEvent;

/**
 * Emitted when a new operation enters the queue.
 *
 */
interface OperationEnqueuedEvent {
    readonly kind: 'enqueued';
    readonly entry: IOperationEntry;
}

/**
 * Emitted when an operation commit succeeds.
 *
 */
interface OperationCommittedEvent {
    readonly kind: 'committed';
    readonly entry: IOperationEntry;
    readonly result: unknown;
}

/**
 * Emitted when an operation commit fails.
 *
 */
interface OperationFailedEvent {
    readonly kind: 'failed';
    readonly entry: IOperationEntry;
    readonly error: unknown;
}

/**
 * Emitted when an operation is rejected (rolled back).
 *
 */
interface OperationRejectedEvent {
    readonly kind: 'rejected';
    readonly entry: IOperationEntry;
}

/**
 * Emitted when an operation is dismissed (hidden from visible entries).
 *
 */
interface OperationDismissedEvent {
    readonly kind: 'dismissed';
    readonly entry: IOperationEntry;
}

/**
 * Emitted when a failed operation is retried.
 *
 */
interface OperationRetriedEvent {
    readonly kind: 'retried';
    readonly entry: IOperationEntry;
}
