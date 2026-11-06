// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The kinds of features `provideAudioRecorder(...)` accepts. `transcriber` is non-multi — exactly
 * one recognition strategy may be registered — while `telemetry` is multi so several observers can
 * follow one recorder.
 *
 * @public
 */
export type AudioFeatureKind = 'transcriber' | 'telemetry';

/**
 * The branded kind vocabulary of the audio entry point. Products that ship their own recognition
 * strategy create features with these kinds, so the kernel still rejects a second transcriber.
 *
 * @public
 */
export const AudioFeatureKinds = {
    Transcriber: featureKind<AudioFeatureKind>('transcriber'),
    Telemetry: featureKind<AudioFeatureKind>('telemetry'),
} as const satisfies Record<string, FeatureKind<AudioFeatureKind>>;
