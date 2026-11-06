import { DOCUMENT, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { BROWSER_STORAGE } from './BROWSER_STORAGE';
import { BrowserStorageFeatureKinds } from './BrowserStorageFeatureKind';
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

describe('withStorage', () => {
    it('creates a non-multi storage feature binding BROWSER_STORAGE to the given value', () => {
        // Arrange
        const storage = createMockStorage();

        // Act
        const feature = withStorage(storage);

        // Assert
        expect(feature.id).toBe('storage');
        expect(feature.kind).toBe(BrowserStorageFeatureKinds.Storage);
        expect(feature.options.multi).toBe(false);
        expect(feature.provide()).toEqual([{ provide: BROWSER_STORAGE, useValue: storage }]);
    });

    it('binds null to disable persistence deliberately', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [...withStorage(null).provide()] });

        // Act
        const storage = TestBed.inject(BROWSER_STORAGE);

        // Assert
        expect(storage).toBeNull();
    });

    it('runs a factory inside the injection context', () => {
        // Arrange
        const storage = createMockStorage();
        const factory = (): Storage | null => (inject(DOCUMENT) ? storage : null);
        TestBed.configureTestingModule({ providers: [...withStorage(factory).provide()] });

        // Act
        const resolved = TestBed.inject(BROWSER_STORAGE);

        // Assert
        expect(resolved).toBe(storage);
    });
});
