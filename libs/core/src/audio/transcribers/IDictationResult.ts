/**
 * The final result of a browser dictation.
 *
 * @public
 */
export interface IDictationResult {
    /** Final transcript, or an empty string after cancellation or failure. */
    readonly transcript: string;
    /** Browser recognition error code, `unsupported` or `start-failed`. */
    readonly errorCode?: string;
}
