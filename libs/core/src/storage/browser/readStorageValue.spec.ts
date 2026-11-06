import { describe, expect, it } from 'vitest';
import { booleanCodec } from '../codecs/booleanCodec';
import { readStorageValue } from './readStorageValue';

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

describe('readStorageValue', () => {
    it('parses the stored representation through the codec', () => {
        // Arrange
        const storage = createMockStorage({ 'nav.open': 'false' });

        // Act
        const value = readStorageValue(storage, 'nav.open', booleanCodec());

        // Assert
        expect(value).toBe(false);
    });

    it('returns undefined when nothing is stored', () => {
        // Arrange
        const storage = createMockStorage();

        // Act
        const value = readStorageValue(storage, 'nav.open', booleanCodec());

        // Assert
        expect(value).toBeUndefined();
    });

    it('returns undefined when the stored representation is invalid', () => {
        // Arrange
        const storage = createMockStorage({ 'nav.open': 'maybe' });

        // Act
        const value = readStorageValue(storage, 'nav.open', booleanCodec());

        // Assert
        expect(value).toBeUndefined();
    });
});
