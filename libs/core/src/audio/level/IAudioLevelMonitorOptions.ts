/** Options for monitoring a borrowed audio stream. @public */
export interface IAudioLevelMonitorOptions {
    /** Duration of each measurement window, between 5 and 1,000 milliseconds. Defaults to 20. */
    readonly frameDurationMs?: number;
}
