import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { AUDIO_INPUT_DEVICE_PREFERENCE_KEY } from './AUDIO_INPUT_DEVICE_PREFERENCE_KEY';

describe('AUDIO_INPUT_DEVICE_PREFERENCE_KEY', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('falls back to a neutral, versioned key', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const key = TestBed.inject(AUDIO_INPUT_DEVICE_PREFERENCE_KEY);

        // Assert
        expect(key).toBe('ngpel.audio.input-device.v1');
    });

    it('yields the composed key instead of the default one', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [{ provide: AUDIO_INPUT_DEVICE_PREFERENCE_KEY, useValue: 'acme.audio.input-device.v1' }],
        });

        // Act
        const key = TestBed.inject(AUDIO_INPUT_DEVICE_PREFERENCE_KEY);

        // Assert
        expect(key).toBe('acme.audio.input-device.v1');
    });
});
