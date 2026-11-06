/**
 * Localized copy required by the voice-session control surface.
 *
 * @public
 */
export interface IVoiceSessionControlLabels {
    /** Label used when assistant audio is currently enabled. */
    readonly assistantMute: string;

    /** Label used when assistant audio is currently muted. */
    readonly assistantUnmute: string;

    /** Label for interrupting the assistant's current spoken response. */
    readonly assistantStop: string;

    /** Label for ending the complete voice session. */
    readonly end: string;

    /** Label used when microphone input is currently enabled. */
    readonly microphoneMute: string;

    /** Label used when microphone input is currently muted. */
    readonly microphoneUnmute: string;

    /** Label used when the session is currently active. */
    readonly pause: string;

    /** Label used when the session is currently paused. */
    readonly resume: string;

    /** Accessible name for the complete control toolbar. */
    readonly toolbar: string;
}
