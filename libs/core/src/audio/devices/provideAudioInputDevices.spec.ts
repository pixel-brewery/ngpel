import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type IUserPreferenceCodec, type IUserPreferenceStorage, USER_PREFERENCE_STORAGE } from '@pixel-brewery/ngpel-core/storage';
import { afterEach, describe, expect, it } from 'vitest';
import { AudioInputDevicePreferenceService } from './AudioInputDevicePreferenceService';
import { AudioInputDeviceService } from './AudioInputDeviceService';
import { provideAudioInputDevices } from './provideAudioInputDevices';
import { withAudioInputDevicePreferenceKey } from './withAudioInputDevicePreferenceKey';

/** In-memory adapter of the user-preference port, performing the same JSON round trip as the Web Storage adapter. */
class InMemoryUserPreferenceStorage implements IUserPreferenceStorage {
    private readonly _entries = new Map<string, string>();

    public read<T>(key: string, codec: IUserPreferenceCodec<T>): T | undefined {
        const serializedValue = this._entries.get(key);

        return serializedValue === undefined ? undefined : codec.parse(JSON.parse(serializedValue));
    }

    public write<T>(key: string, value: T, codec: IUserPreferenceCodec<T>): void {
        this._entries.set(key, JSON.stringify(codec.serialize(value)));
    }

    public remove(key: string): void {
        this._entries.delete(key);
    }

    public has(key: string): boolean {
        return this._entries.has(key);
    }

    public clear(): void {
        this._entries.clear();
    }
}

describe('provideAudioInputDevices', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('registers discovery and persistence for the composition root', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [
                provideAudioInputDevices(),
                { provide: DOCUMENT, useValue: { defaultView: null } },
                { provide: USER_PREFERENCE_STORAGE, useValue: new InMemoryUserPreferenceStorage() },
            ],
        });

        // Act
        const deviceService = TestBed.inject(AudioInputDeviceService);

        // Assert
        expect(deviceService).toBeInstanceOf(AudioInputDeviceService);
        expect(TestBed.inject(AudioInputDevicePreferenceService)).toBeInstanceOf(AudioInputDevicePreferenceService);
    });

    it('fails loudly when the user-preference port is not composed', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideAudioInputDevices(), { provide: DOCUMENT, useValue: { defaultView: null } }],
        });

        // Act
        const resolve = (): unknown => TestBed.inject(AudioInputDevicePreferenceService);

        // Assert
        expect(resolve).toThrow(/No provider/);
    });

    it('rejects two competing preference keys at composition time', () => {
        // Arrange
        const features = [withAudioInputDevicePreferenceKey('acme.audio.input-device.v1'), withAudioInputDevicePreferenceKey('acme.audio.input-device.v2')];

        // Act
        const compose = (): unknown => provideAudioInputDevices(...features);

        // Assert
        expect(compose).toThrow(/non-multi kind 'preference-key'/);
    });
});
