// #region Imports

import type { IVoiceTranscriber } from './IVoiceTranscriber';

// #endregion

/**
 * Extends a voice transcriber with a manually controlled live recognition session.
 *
 * Browser speech recognition cannot consume a previously recorded blob. A strategy with this
 * capability therefore listens while the recording user interface is active and returns the
 * accumulated transcript only when the user explicitly finishes the session.
 *
 * @public
 */
export interface ILiveVoiceTranscriber extends IVoiceTranscriber {
    // #region Properties

    /**
     * Stable capability marker, checked by {@link isLiveVoiceTranscriber} so callers never depend
     * on a concrete implementation.
     */
    readonly supportsLiveSessions: true;

    // #endregion

    // #region Methods

    /**
     * Starts a manually controlled live recognition session.
     *
     * @public
     * @param audioTrack Already authorized live microphone track to recognize instead of the
     * browser default, which avoids a second permission prompt while recording.
     */
    startSession(audioTrack?: MediaStreamTrack): Promise<void>;

    /**
     * Stops the active session and returns all recognized text.
     *
     * @public
     * @returns A promise resolving to the accumulated transcript.
     */
    stopSession(): Promise<string>;

    /**
     * Aborts the active session and discards its recognized text.
     *
     * @public
     */
    cancelSession(): void;

    // #endregion
}
