/**
 * A retained signal value and the instant when it was recorded.
 *
 * @internal
 * @typeParam T The recorded value type.
 */
export interface ITrackableSignalRecord<T> {
    // #region Properties

    /**
     * The value at the time of recording.
     */
    value: T;

    /**
     * The recording time in milliseconds since the Unix epoch.
     */
    timestamp: number;

    // #endregion
}
