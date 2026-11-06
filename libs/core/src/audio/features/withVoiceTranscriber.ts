// #region Imports

import type { Type } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { IVoiceTranscriber } from '../transcribers/IVoiceTranscriber';
import { VOICE_TRANSCRIBER } from '../transcribers/VOICE_TRANSCRIBER';
import { type AudioFeatureKind, AudioFeatureKinds } from './AudioFeatureKind';

// #endregion

/**
 * Registers a product-owned recognition strategy under {@link VOICE_TRANSCRIBER} — an API-backed
 * transcriber, a desktop bridge, or any other adapter. It conflicts with
 * `withLocalTranscriber()` by design: one recorder recognizes through one strategy.
 *
 * @public
 * @param adapter The adapter class, instantiated by the injector so it can inject its own
 * dependencies.
 * @returns A feature for `provideAudioRecorder(...)`.
 *
 * @example
 * ```typescript
 * provideAudioRecorder(withVoiceTranscriber(ApiVoiceTranscriber))
 * ```
 */
export function withVoiceTranscriber(adapter: Type<IVoiceTranscriber>): IFeature<AudioFeatureKind> {
    return createFeature('voice-transcriber', AudioFeatureKinds.Transcriber, [{ provide: VOICE_TRANSCRIBER, useClass: adapter }]);
}
