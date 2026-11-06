// #region Imports

import { InjectionToken } from '@angular/core';
import type { ILocalVoiceTranscriberOptions } from './ILocalVoiceTranscriberOptions';

// #endregion

/**
 * Injection token carrying the {@link ILocalVoiceTranscriberOptions}. Registered by
 * `withLocalTranscriber(...)`; when absent, the {@link LocalVoiceTranscriber} falls back to its
 * documented defaults.
 *
 * @public
 */
export const LOCAL_VOICE_TRANSCRIBER_OPTIONS = new InjectionToken<ILocalVoiceTranscriberOptions>('NGPEL_LOCAL_VOICE_TRANSCRIBER_OPTIONS');
