import { describe, expect, it } from 'vitest';
import { nonEmptyStringCodec } from '../codecs/nonEmptyStringCodec';
import { writeStorageValue } from './writeStorageValue';

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

describe('writeStorageValue', () => {
    it('serializes the value, stores it and returns the representation', () => {
        // Arrange
        const storage = createMockStorage();

        // Act
        const serializedValue = writeStorageValue(storage, 'view', ' table ', nonEmptyStringCodec);

        // Assert
        expect(serializedValue).toBe('table');
        expect(storage.getItem('view')).toBe('table');
    });

    it('removes the key for undefined and returns null', () => {
        // Arrange
        const storage = createMockStorage({ view: 'table' });

        // Act
        const serializedValue = writeStorageValue(storage, 'view', undefined, nonEmptyStringCodec);

        // Assert
        expect(serializedValue).toBeNull();
        expect(storage.getItem('view')).toBeNull();
    });

    it('leaves the storage untouched when the codec refuses the value', () => {
        // Arrange
        const storage = createMockStorage({ view: 'table' });

        // Act
        const write = (): string | null => writeStorageValue(storage, 'view', '   ', nonEmptyStringCodec);

        // Assert
        expect(write).toThrow(TypeError);
        expect(storage.getItem('view')).toBe('table');
    });
});
