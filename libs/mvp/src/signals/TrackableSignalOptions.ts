/**
 * Configures the retained history of a trackable signal.
 *
 * @public
 * @typeParam T The signal value type.
 */
export interface TrackableSignalOptions<T> {
    // #region Properties

    /**
     * Maximum number of snapshots, including the current snapshot. Defaults to 100.
     * Finite values are rounded down and clamped to at least one.
     */
    capacity?: number;

    /**
     * Decides whether a changed value belongs in history. Skipped values still update the signal.
     *
     * @param newValue The requested value.
     * @param oldValue The last recorded value.
     * @returns Whether the new value should be recorded.
     */
    shouldRecord?: (newValue: T, oldValue: T) => boolean;

    // #endregion
}
