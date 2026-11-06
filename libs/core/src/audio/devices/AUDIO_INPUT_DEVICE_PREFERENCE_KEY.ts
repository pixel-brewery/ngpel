// #region Imports

import { InjectionToken } from '@angular/core';

// #endregion

/**
 * Injection token carrying the user-preference key the
 * {@link AudioInputDevicePreferenceService} stores its selection under. It defaults to a neutral,
 * versioned key; a product that already persists a microphone under its own key keeps that key by
 * composing `provideAudioInputDevices(withAudioInputDevicePreferenceKey('acme.audio.input-device.v1'))`
 * instead of migrating the stored value.
 *
 * @public
 */
export const AUDIO_INPUT_DEVICE_PREFERENCE_KEY = new InjectionToken<string>('NGPEL_AUDIO_INPUT_DEVICE_PREFERENCE_KEY', {
    factory: (): string => 'ngpel.audio.input-device.v1',
});
