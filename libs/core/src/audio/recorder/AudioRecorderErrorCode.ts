/**
 * Stable failure categories of the browser audio recorder. They exist so a user interface can
 * decide on recovery — ask for permission again, offer another device, fall back to typing —
 * without parsing browser messages.
 *
 * @public
 */
export type AudioRecorderErrorCode =
    | 'unsupported'
    | 'invalid-state'
    | 'permission-denied'
    | 'device-not-found'
    | 'constraints-unsatisfied'
    | 'capture-aborted'
    | 'capture-failed'
    | 'recorder-failed';
