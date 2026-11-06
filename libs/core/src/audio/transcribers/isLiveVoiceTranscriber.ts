// #region Imports

import type { ILiveVoiceTranscriber } from './ILiveVoiceTranscriber';
import type { IVoiceTranscriber } from './IVoiceTranscriber';

// #endregion

/**
 * Determines whether a configured transcriber supports live recognition sessions, so a recorder
 * user interface can offer live dictation without knowing which strategy is registered.
 *
 * @public
 * @param transcriber The configured transcription strategy, which may be absent.
 * @returns `true` when the strategy exposes the live-session lifecycle.
 *
 * @example
 * ```typescript
 * const transcriber = inject(VOICE_TRANSCRIBER, { optional: true });
 * if (isLiveVoiceTranscriber(transcriber)) {
 *     await transcriber.startSession();
 * }
 * ```
 */
export function isLiveVoiceTranscriber(transcriber: IVoiceTranscriber | null | undefined): transcriber is ILiveVoiceTranscriber {
    return Boolean(transcriber && 'supportsLiveSessions' in transcriber && transcriber.supportsLiveSessions === true);
}
