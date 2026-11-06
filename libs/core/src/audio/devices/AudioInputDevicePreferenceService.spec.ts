import { TestBed } from '@angular/core/testing';
import { type IUserPreferenceCodec, type IUserPreferenceStorage, USER_PREFERENCE_STORAGE } from '@pixel-brewery/ngpel-core/storage';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AUDIO_INPUT_DEVICE_PREFERENCE_KEY } from './AUDIO_INPUT_DEVICE_PREFERENCE_KEY';
import { AudioInputDevicePreferenceService } from './AudioInputDevicePreferenceService';

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

const DEFAULT_KEY = 'ngpel.audio.input-device.v1';

const STORED_PREFERENCE = {
    deviceId: 'microphone-1',
    label: 'Desk microphone',
    schemaVersion: 1,
    testedAt: '2026-07-16T08:00:00.000Z',
};

function createService(storage: InMemoryUserPreferenceStorage, key?: string): AudioInputDevicePreferenceService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        providers: [
            AudioInputDevicePreferenceService,
            { provide: USER_PREFERENCE_STORAGE, useValue: storage },
            ...(key ? [{ provide: AUDIO_INPUT_DEVICE_PREFERENCE_KEY, useValue: key }] : []),
        ],
    });

    return TestBed.inject(AudioInputDevicePreferenceService);
}

describe('AudioInputDevicePreferenceService', () => {
    let storage: InMemoryUserPreferenceStorage;

    beforeEach(() => {
        storage = new InMemoryUserPreferenceStorage();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('restores a valid stored microphone selection', () => {
        // Arrange
        storage.write(DEFAULT_KEY, STORED_PREFERENCE, { parse: (value) => value, serialize: (value) => value });

        // Act
        const service = createService(storage);

        // Assert
        expect(service.preference()).toEqual(STORED_PREFERENCE);
    });

    it('ignores a stored payload of an unknown schema instead of restoring it', () => {
        // Arrange
        storage.write(DEFAULT_KEY, { ...STORED_PREFERENCE, schemaVersion: 2 }, { parse: (value) => value, serialize: (value) => value });

        // Act
        const service = createService(storage);

        // Assert
        expect(service.preference()).toBeNull();
    });

    it('persists a normalized selection with the successful test timestamp', () => {
        // Arrange
        const service = createService(storage);

        // Act
        service.save(' microphone-2 ', ' Conference microphone ', new Date('2026-07-16T09:30:00.000Z'));

        // Assert
        expect(service.preference()).toEqual({
            deviceId: 'microphone-2',
            label: 'Conference microphone',
            schemaVersion: 1,
            testedAt: '2026-07-16T09:30:00.000Z',
        });
        expect(storage.has(DEFAULT_KEY)).toBe(true);
    });

    it('stores the selection under the composed key', () => {
        // Arrange
        const service = createService(storage, 'acme.audio.input-device.v1');

        // Act
        service.save('microphone-2', 'Conference microphone');

        // Assert
        expect(storage.has('acme.audio.input-device.v1')).toBe(true);
        expect(storage.has(DEFAULT_KEY)).toBe(false);
    });

    it('clears the stored selection', () => {
        // Arrange
        storage.write(DEFAULT_KEY, STORED_PREFERENCE, { parse: (value) => value, serialize: (value) => value });
        const service = createService(storage);

        // Act
        service.clear();

        // Assert
        expect(service.preference()).toBeNull();
        expect(storage.has(DEFAULT_KEY)).toBe(false);
    });
});
