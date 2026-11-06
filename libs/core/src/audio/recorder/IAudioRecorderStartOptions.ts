// #region Imports

import type { AudioRecordingRetention } from './AudioRecordingRetention';

// #endregion

/**
 * Configures microphone acquisition and incremental browser recording. Every option is optional;
 * an empty object records the default microphone with Opus in WebM at 128 kbit/s, one chunk per
 * second, retained in memory.
 *
 * @public
 */
export interface IAudioRecorderStartOptions {
    // #region Properties

    /**
     * Browser audio-track constraints applied during microphone acquisition, such as
     * `echoCancellation`, `noiseSuppression`, `autoGainControl` or `sampleRate`.
     */
    readonly audioConstraints?: MediaTrackConstraints | null;

    /**
     * Exact microphone device identifier. It overrides `audioConstraints.deviceId`.
     */
    readonly audioDeviceId?: string | null;

    /**
     * Target encoded audio bitrate in bits per second.
     */
    readonly audioBitsPerSecond?: number | null;

    /**
     * Maximum requested interval between incremental chunks in milliseconds.
     */
    readonly chunkIntervalMs?: number | null;

    /**
     * Ordered MIME type preferences; the first one the browser supports wins.
     */
    readonly preferredMimeTypes?: ReadonlyArray<string> | null;

    /**
     * Determines whether the recorder assembles a final in-memory audio blob.
     */
    readonly retention?: AudioRecordingRetention | null;

    // #endregion
}
