/**
 * Technical input-signal quality visualized by the signal indicator.
 *
 * The values describe audio capture quality only. They deliberately do not
 * claim semantic transcription or assistant-understanding confidence.
 *
 * @public
 */
export type AudioSignalQuality = 'clipping' | 'fair' | 'good' | 'no-signal' | 'poor' | 'unknown';
