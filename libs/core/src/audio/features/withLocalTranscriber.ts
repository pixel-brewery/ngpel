// #region Imports

import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { ILocalVoiceTranscriberOptions } from '../transcribers/ILocalVoiceTranscriberOptions';
import { LOCAL_VOICE_TRANSCRIBER_OPTIONS } from '../transcribers/LOCAL_VOICE_TRANSCRIBER_OPTIONS';
import { LocalVoiceTranscriber } from '../transcribers/LocalVoiceTranscriber';
import { VOICE_TRANSCRIBER } from '../transcribers/VOICE_TRANSCRIBER';
import { type AudioFeatureKind, AudioFeatureKinds } from './AudioFeatureKind';

// #endregion

/**
 * Registers the browser-based {@link LocalVoiceTranscriber} under {@link VOICE_TRANSCRIBER}. It
 * also satisfies the live-session contract, so a recorder user interface can dictate while
 * recording.
 *
 * @public
 * @param options Recognition language and result options; defaults apply per option.
 * @returns A feature for `provideAudioRecorder(...)`.
 *
 * @example
 * ```typescript
 * provideAudioRecorder(withLocalTranscriber({ language: 'de-DE' }))
 * ```
 */
export function withLocalTranscriber(options: ILocalVoiceTranscriberOptions = {}): IFeature<AudioFeatureKind> {
    return createFeature('local-transcriber', AudioFeatureKinds.Transcriber, [
        { provide: LOCAL_VOICE_TRANSCRIBER_OPTIONS, useValue: options },
        { provide: VOICE_TRANSCRIBER, useClass: LocalVoiceTranscriber },
    ]);
}
