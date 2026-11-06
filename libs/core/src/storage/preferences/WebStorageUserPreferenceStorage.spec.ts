import { LocalStorageUnavailableError } from '../browser/LocalStorageUnavailableError';
import { describe, expect, it } from 'vitest';
import { JsonUserPreferenceCodec } from './JsonUserPreferenceCodec';
import { WebStorageUserPreferenceStorage } from './WebStorageUserPreferenceStorage';

/** In-memory `Storage`: a fresh object per call, so `storageArea` comparisons work. */
function createMockStorage(initialEntries: Readonly<Record<string, string>> = {}): Storage {
    const store = new Map<string, string>(Object.entries(initialEntries));

    return {
        get length(): number {
            return store.size;
        },
        clear(): void {
            store.clear();
        },
        getItem(key: string): string | null {
            return store.get(key) ?? null;
        },
        key(index: number): string | null {
            return [...store.keys()][index] ?? null;
        },
        removeItem(key: string): void {
            store.delete(key);
        },
        setItem(key: string, value: string): void {
            store.set(key, String(value));
        },
    };
}

const numberCodec = new JsonUserPreferenceCodec((value: unknown): value is number => typeof value === 'number');

describe('WebStorageUserPreferenceStorage', () => {
    it('writes the serialized value as JSON under the key', () => {
        // Arrange
        const storage = createMockStorage();
        const preferences = new WebStorageUserPreferenceStorage(storage);

        // Act
        preferences.write('page.size', 25, numberCodec);

        // Assert
        expect(storage.getItem('page.size')).toBe('25');
    });

    it('reads back a value through the codec', () => {
        // Arrange
        const storage = createMockStorage({ 'page.size': '50' });
        const preferences = new WebStorageUserPreferenceStorage(storage);

        // Act
        const value = preferences.read('page.size', numberCodec);

        // Assert
        expect(value).toBe(50);
    });

    it('reads undefined for missing keys, empty strings, malformed JSON and guard failures', () => {
        // Arrange
        const storage = createMockStorage({ empty: '', malformed: '{', wrongType: '"text"' });
        const preferences = new WebStorageUserPreferenceStorage(storage);

        // Act
        const values = [
            preferences.read('missing', numberCodec),
            preferences.read('empty', numberCodec),
            preferences.read('malformed', numberCodec),
            preferences.read('wrongType', numberCodec),
        ];

        // Assert
        expect(values).toEqual([undefined, undefined, undefined, undefined]);
    });

    it('removes a key', () => {
        // Arrange
        const storage = createMockStorage({ 'page.size': '25' });
        const preferences = new WebStorageUserPreferenceStorage(storage);

        // Act
        preferences.remove('page.size');

        // Assert
        expect(storage.getItem('page.size')).toBeNull();
    });

    it('reads undefined without storage', () => {
        // Arrange
        const preferences = new WebStorageUserPreferenceStorage(null);

        // Act
        const value = preferences.read('page.size', numberCodec);

        // Assert
        expect(value).toBeUndefined();
    });

    it('throws a LocalStorageUnavailableError for mutations without storage', () => {
        // Arrange
        const preferences = new WebStorageUserPreferenceStorage(null);

        // Act
        const attempts = [(): void => preferences.write('page.size', 25, numberCodec), (): void => preferences.remove('page.size')];

        // Assert
        expect(attempts[0]).toThrow(new LocalStorageUnavailableError('page.size', 'write'));
        expect(attempts[1]).toThrow(new LocalStorageUnavailableError('page.size', 'remove'));
    });
});
