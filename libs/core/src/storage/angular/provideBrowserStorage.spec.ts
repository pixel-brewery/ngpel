import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { BROWSER_STORAGE } from './BROWSER_STORAGE';
import { provideBrowserStorage } from './provideBrowserStorage';
import { withStorage } from './withStorage';

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

describe('provideBrowserStorage', () => {
    it('substitutes the storage bound by withStorage', () => {
        // Arrange
        const storage = createMockStorage();
        TestBed.configureTestingModule({ providers: [provideBrowserStorage(withStorage(storage))] });

        // Act
        const resolved = TestBed.inject(BROWSER_STORAGE);

        // Assert
        expect(resolved).toBe(storage);
    });

    it('keeps the root default when called without features', () => {
        // Arrange
        const localStorage = createMockStorage();
        TestBed.configureTestingModule({
            providers: [provideBrowserStorage(), { provide: DOCUMENT, useValue: { defaultView: { localStorage, sessionStorage: createMockStorage() } } }],
        });

        // Act
        const resolved = TestBed.inject(BROWSER_STORAGE);

        // Assert
        expect(resolved).toBe(localStorage);
    });

    it('rejects two storage features', () => {
        // Arrange
        const first = withStorage(createMockStorage());
        const second = withStorage(null);

        // Act
        const provide = (): unknown => provideBrowserStorage(first, second);

        // Assert
        expect(provide).toThrow(/Feature conflict: multiple features of non-multi kind 'storage'/);
    });
});
