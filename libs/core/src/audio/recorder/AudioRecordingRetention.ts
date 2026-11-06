/**
 * Controls whether emitted chunks are also retained for a final in-memory recording. `none` keeps
 * a long session memory-free for callers that persist or upload every chunk themselves.
 *
 * @public
 */
export type AudioRecordingRetention = 'memory' | 'none';
