// #region Imports

import { InjectionToken } from '@angular/core';
import type { IVoiceTranscriber } from './IVoiceTranscriber';

// #endregion

/**
 * Injection token of the active {@link IVoiceTranscriber}. It has no default factory on purpose:
 * importing the token must not pull a recognition strategy into the bundle. Bind it through
 * `provideAudioRecorder(withLocalTranscriber())` or `withVoiceTranscriber(...)`; while it is
 * unbound, transcription is simply unavailable and the recorder still records.
 *
 * @public
 */
export const VOICE_TRANSCRIBER = new InjectionToken<IVoiceTranscriber>('NGPEL_VOICE_TRANSCRIBER');
