import { describe, expect, it } from 'vitest';
import { LocalStorageUnavailableError } from './LocalStorageUnavailableError';
import { requireStorage } from './requireStorage';

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

describe('requireStorage', () => {
    it('returns the storage when one is available', () => {
        // Arrange
        const storage = createMockStorage();

        // Act
        const required = requireStorage(storage, 'nav.open', 'write');

        // Assert
        expect(required).toBe(storage);
    });

    it('throws the documented error naming key and operation when storage is unavailable', () => {
        // Arrange
        const storage = null;

        // Act
        const require = (): Storage => requireStorage(storage, 'nav.open', 'remove');

        // Assert
        expect(require).toThrow(new LocalStorageUnavailableError('nav.open', 'remove'));
    });
});
