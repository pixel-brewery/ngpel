// #region Imports

// #endregion

/**
 * Configuration options for the operation queue.
 *
 * @public
 */
export interface IOperationQueueOptions {
    /**
     * Default delay in milliseconds before an operation is auto-committed.
     * Can be overridden per operation via {@link IOperation.delayInMilliseconds}.
     *
     * @public
     */
    readonly defaultDelayInMilliseconds: number;

    /**
     * Interval in milliseconds for the countdown tick that updates
     * {@link IOperationEntry.remainingMilliseconds}.
     *
     * @public
     */
    readonly countdownIntervalInMilliseconds: number;
}
