// #region Imports

import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { AUDIO_INPUT_DEVICE_PREFERENCE_KEY } from './AUDIO_INPUT_DEVICE_PREFERENCE_KEY';
import { type AudioInputDeviceFeatureKind, AudioInputDeviceFeatureKinds } from './AudioInputDeviceFeatureKind';

// #endregion

/**
 * Overrides the user-preference key the microphone selection is stored under. A product that
 * already persists a microphone keeps its own key here, so the stored value survives the move to
 * this package instead of silently resetting every browser profile.
 *
 * @public
 * @param key The user-preference key; leading and trailing whitespace is removed.
 * @returns A feature for `provideAudioInputDevices(...)`.
 * @throws Error when the key is empty.
 *
 * @example
 * ```typescript
 * provideAudioInputDevices(withAudioInputDevicePreferenceKey('acme.audio.input-device.v1'))
 * ```
 */
export function withAudioInputDevicePreferenceKey(key: string): IFeature<AudioInputDeviceFeatureKind> {
    const normalizedKey = key.trim();

    if (!normalizedKey) {
        throw new Error('The audio-input device preference key cannot be empty.');
    }

    return createFeature('preference-key', AudioInputDeviceFeatureKinds.PreferenceKey, [
        { provide: AUDIO_INPUT_DEVICE_PREFERENCE_KEY, useValue: normalizedKey },
    ]);
}
