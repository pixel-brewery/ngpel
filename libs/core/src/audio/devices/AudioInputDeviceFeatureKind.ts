// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The kinds of features `provideAudioInputDevices(...)` accepts. The preference-key kind is
 * non-multi: one composition stores its microphone selection under exactly one key.
 *
 * @public
 */
export type AudioInputDeviceFeatureKind = 'preference-key';

/**
 * The branded kind vocabulary of the audio-input device composition.
 *
 * @public
 */
export const AudioInputDeviceFeatureKinds = {
    PreferenceKey: featureKind<AudioInputDeviceFeatureKind>('preference-key'),
} as const satisfies Record<string, FeatureKind<AudioInputDeviceFeatureKind>>;
