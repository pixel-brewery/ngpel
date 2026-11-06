/**
 * Runtime context passed to every {@link IOperation} lifecycle hook.
 *
 * @public
 */
export interface IOperationContext {
    /**
     * Unique id of the operation entry within the queue.
     *
     * @public
     */
    readonly entryId: string;

    /** Stable key to send with the same mutation on every retry. */
    readonly idempotencyKey: string;

    /**
     * The {@link IOperation.type} discriminator.
     *
     * @public
     */
    readonly operationType: string;

    /**
     * Timestamp (ms) when the operation was enqueued.
     *
     * @public
     */
    readonly requestedAt: number;
}
