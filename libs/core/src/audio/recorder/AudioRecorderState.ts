/**
 * Lifecycle states of a browser audio recording session. `stopping` is entered while the browser
 * still delivers its final chunk, and `disposed` is terminal.
 *
 * @public
 */
export type AudioRecorderState = 'idle' | 'acquiring' | 'recording' | 'paused' | 'stopping' | 'error' | 'disposed';
