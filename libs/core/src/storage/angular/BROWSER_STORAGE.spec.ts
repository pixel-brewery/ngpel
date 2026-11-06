import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { BrowserStorageArea } from '../browser/BrowserStorageArea';
import { BROWSER_STORAGE } from './BROWSER_STORAGE';

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

/**
 * Substitutes the `DOCUMENT` so the token resolves against a window under the spec's control
 * instead of the ambient one, whose storage areas differ per test runner.
 */
function provideWindow(defaultView: Pick<Window, BrowserStorageArea> | null): void {
    TestBed.configureTestingModule({ providers: [{ provide: DOCUMENT, useValue: { defaultView } }] });
}

describe('BROWSER_STORAGE', () => {
    it('resolves the localStorage of the DOCUMENT window by default', () => {
        // Arrange
        const localStorage = createMockStorage();
        provideWindow({ localStorage, sessionStorage: createMockStorage() });

        // Act
        const storage = TestBed.inject(BROWSER_STORAGE);

        // Assert
        expect(storage).toBe(localStorage);
    });

    it('resolves to null when the DOCUMENT has no window', () => {
        // Arrange
        provideWindow(null);

        // Act
        const storage = TestBed.inject(BROWSER_STORAGE);

        // Assert
        expect(storage).toBeNull();
    });
});
