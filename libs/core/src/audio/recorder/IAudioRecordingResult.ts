// #region Imports

import type { AudioRecordingRetention } from './AudioRecordingRetention';

// #endregion

/**
 * Metadata produced when an audio recording ends successfully.
 *
 * @public
 */
export interface IAudioRecordingResult {
    // #region Properties

    /**
     * Complete audio payload, or `null` when the session deliberately retained nothing.
     */
    readonly blob: Blob | null;

    /**
     * Number of non-empty chunks emitted during the recording.
     */
    readonly chunkCount: number;

    /**
     * Active recording duration excluding paused intervals.
     */
    readonly durationMs: number;

    /**
     * Effective encoded MIME type of the recording.
     */
    readonly mimeType: string;

    /**
     * Retention strategy the recording used.
     */
    readonly retention: AudioRecordingRetention;

    // #endregion
}
