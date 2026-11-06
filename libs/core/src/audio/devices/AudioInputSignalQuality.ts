/**
 * Normalized quality of the currently sampled microphone signal, derived from its RMS level and
 * its peak amplitude.
 *
 * @public
 */
export type AudioInputSignalQuality = 'clipping' | 'fair' | 'good' | 'no-signal' | 'poor' | 'unknown';
