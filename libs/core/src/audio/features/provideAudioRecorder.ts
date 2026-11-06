// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { AudioRecorder } from '../recorder/AudioRecorder';
import type { AudioFeatureKind } from './AudioFeatureKind';

// #endregion

/**
 * Registers the {@link AudioRecorder} together with the features contributed to it. Without a
 * transcriber feature the recorder still records; only `transcribe()` stays unavailable.
 *
 * @public
 * @param features Recorder features such as `withLocalTranscriber()`, `withVoiceTranscriber(...)`
 * and `withTelemetry(...)`.
 * @returns Environment providers for the application or route composition root.
 * @throws Error when two transcriber features are given.
 *
 * @example
 * ```typescript
 * export const appConfig = {
 *     providers: [provideAudioRecorder(withLocalTranscriber({ language: 'de-DE' }))]
 * };
 * ```
 */
export function provideAudioRecorder(...features: ReadonlyArray<IFeature<AudioFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([AudioRecorder], features));
}
