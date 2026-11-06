import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { AUDIO_INPUT_DEVICE_PREFERENCE_KEY } from './AUDIO_INPUT_DEVICE_PREFERENCE_KEY';
import { AudioInputDeviceFeatureKinds } from './AudioInputDeviceFeatureKind';
import { provideAudioInputDevices } from './provideAudioInputDevices';
import { withAudioInputDevicePreferenceKey } from './withAudioInputDevicePreferenceKey';

describe('withAudioInputDevicePreferenceKey', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('binds the product key the selection is stored under', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideAudioInputDevices(withAudioInputDevicePreferenceKey(' acme.audio.input-device.v1 '))],
        });

        // Act
        const key = TestBed.inject(AUDIO_INPUT_DEVICE_PREFERENCE_KEY);

        // Assert
        expect(key).toBe('acme.audio.input-device.v1');
        expect(withAudioInputDevicePreferenceKey('acme').kind).toBe(AudioInputDeviceFeatureKinds.PreferenceKey);
    });

    it('refuses an empty key instead of storing under one', () => {
        // Arrange

        // Act
        const createFeature = (): unknown => withAudioInputDevicePreferenceKey('   ');

        // Assert
        expect(createFeature).toThrow('The audio-input device preference key cannot be empty.');
    });
});
