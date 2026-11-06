// #region Imports

// #endregion

/**
 * Abstraction over the system clock, enabling deterministic testing.
 *
 * @public
 */
export interface IOperationClock {
    /**
     * Returns the current timestamp in milliseconds.
     *
     * @returns Current time in milliseconds.
     * @public
     */
    now(): number;
}
