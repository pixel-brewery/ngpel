import { DOCUMENT, type Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { provideBrowserStorage } from '../angular/provideBrowserStorage';
import { withStorage } from '../angular/withStorage';
import { LocalStorageUnavailableError } from '../browser/LocalStorageUnavailableError';
import { JsonUserPreferenceCodec } from './JsonUserPreferenceCodec';
import { provideUserPreferences } from './provideUserPreferences';
import { USER_PREFERENCE_STORAGE } from './USER_PREFERENCE_STORAGE';
import { UserPreferenceFeatureKinds } from './UserPreferenceFeatureKind';
import { WebStorageUserPreferenceStorage } from './WebStorageUserPreferenceStorage';
import { withLocalStorage } from './withLocalStorage';

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

const stringCodec = new JsonUserPreferenceCodec((value: unknown): value is string => typeof value === 'string');

/**
 * Substitutes the `DOCUMENT` so the default storage seam resolves against a window under the
 * spec's control instead of the ambient one, whose storage areas differ per test runner.
 */
function provideWindowStorage(localStorage: Storage): Provider {
    return { provide: DOCUMENT, useValue: { defaultView: { localStorage, sessionStorage: createMockStorage() } } };
}

describe('withLocalStorage', () => {
    it('creates a non-multi storage feature', () => {
        // Arrange
        const kind = UserPreferenceFeatureKinds.Storage;

        // Act
        const feature = withLocalStorage();

        // Assert
        expect(feature.id).toBe('local-storage');
        expect(feature.kind).toBe(kind);
        expect(feature.options.multi).toBe(false);
        expect(feature.provide()).toHaveLength(1);
    });

    it('stores preferences in the localStorage of the DOCUMENT window by default', () => {
        // Arrange
        const localStorage = createMockStorage();
        TestBed.configureTestingModule({ providers: [provideUserPreferences(withLocalStorage()), provideWindowStorage(localStorage)] });
        const preferences = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Act
        preferences.write('theme', 'dark', stringCodec);

        // Assert
        expect(preferences).toBeInstanceOf(WebStorageUserPreferenceStorage);
        expect(localStorage.getItem('theme')).toBe('"dark"');
    });

    it('follows the storage substituted through BROWSER_STORAGE', () => {
        // Arrange
        const substitutedStorage = createMockStorage();
        const windowStorage = createMockStorage();
        TestBed.configureTestingModule({
            providers: [
                provideBrowserStorage(withStorage(substitutedStorage)),
                provideUserPreferences(withLocalStorage()),
                provideWindowStorage(windowStorage),
            ],
        });
        const preferences = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Act
        preferences.write('theme', 'light', stringCodec);

        // Assert
        expect(substitutedStorage.getItem('theme')).toBe('"light"');
        expect(windowStorage.getItem('theme')).toBeNull();
    });

    it('degrades reads to undefined when storage was declared unavailable', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideBrowserStorage(withStorage(null)), provideUserPreferences(withLocalStorage())] });
        const preferences = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Act
        const value = preferences.read('theme', stringCodec);

        // Assert
        expect(value).toBeUndefined();
    });

    it('throws on a write when storage was declared unavailable', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideBrowserStorage(withStorage(null)), provideUserPreferences(withLocalStorage())] });
        const preferences = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Act
        const write = (): void => preferences.write('theme', 'dark', stringCodec);

        // Assert
        expect(write).toThrow(new LocalStorageUnavailableError('theme', 'write'));
    });
});
