/**
 * Browser permission state for microphone access. `unknown` is the state before the browser was
 * asked, `unsupported` the state of a runtime without media APIs.
 *
 * @public
 */
export type AudioInputPermissionState = 'denied' | 'granted' | 'prompt' | 'unknown' | 'unsupported';
