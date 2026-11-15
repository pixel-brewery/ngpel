/**
 * Options for a dictation that completes when the browser ends recognition.
 *
 * @public
 */
export interface IDictationOptions {
    /** Recognizes continuously until the browser or caller ends the session. */
    readonly continuous?: boolean;
    /** BCP 47 language for this session. Defaults to the configured recognition language. */
    readonly language?: string;
    /** Receives the complete current transcript, including interim text. */
    readonly onTranscript?: (transcript: string) => void;
}
