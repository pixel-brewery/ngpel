/** One measured window of the mono audio input. @public */
export interface IAudioLevelMeasurement {
    /** Root mean square amplitude, from zero to one. */
    readonly rms: number;

    /** Highest absolute sample amplitude, from zero to one. */
    readonly peak: number;

    /** RMS level in dBFS, or `null` for digital silence. */
    readonly decibels: number | null;

    /** Duration of the measured samples. The final window can be shorter than requested. */
    readonly durationMs: number;

    /** Monotonic start time, anchored when monitoring starts and advanced by the samples measured. */
    readonly timestampMs: number;
}
