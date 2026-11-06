import { DOCUMENT, type Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { LocalStorageUnavailableError } from '../browser/LocalStorageUnavailableError';
import { JsonUserPreferenceCodec } from './JsonUserPreferenceCodec';
import { provideUserPreferences } from './provideUserPreferences';
import { USER_PREFERENCE_STORAGE } from './USER_PREFERENCE_STORAGE';
import { UserPreferenceFeatureKinds } from './UserPreferenceFeatureKind';
import { withSessionStorage } from './withSessionStorage';

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
 * Substitutes the `DOCUMENT` so both storage areas are under the spec's control instead of the
 * ambient window's, whose storage areas differ per test runner.
 */
function provideWindowStorage(localStorage: Storage, sessionStorage: Storage): Provider {
    return { provide: DOCUMENT, useValue: { defaultView: { localStorage, sessionStorage } } };
}

describe('withSessionStorage', () => {
    it('creates a non-multi storage feature', () => {
        // Arrange
        const kind = UserPreferenceFeatureKinds.Storage;

        // Act
        const feature = withSessionStorage();

        // Assert
        expect(feature.id).toBe('session-storage');
        expect(feature.kind).toBe(kind);
        expect(feature.options.multi).toBe(false);
        expect(feature.provide()).toHaveLength(1);
    });

    it('stores preferences in the sessionStorage of the DOCUMENT window', () => {
        // Arrange
        const localStorage = createMockStorage();
        const sessionStorage = createMockStorage();
        TestBed.configureTestingModule({ providers: [provideUserPreferences(withSessionStorage()), provideWindowStorage(localStorage, sessionStorage)] });
        const preferences = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Act
        preferences.write('wizard.step', 'address', stringCodec);

        // Assert
        expect(sessionStorage.getItem('wizard.step')).toBe('"address"');
        expect(localStorage.getItem('wizard.step')).toBeNull();
        expect(preferences.read('wizard.step', stringCodec)).toBe('address');
    });

    it('degrades reads to undefined when the DOCUMENT has no window', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideUserPreferences(withSessionStorage()), { provide: DOCUMENT, useValue: { defaultView: null } }] });
        const preferences = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Act
        const value = preferences.read('wizard.step', stringCodec);

        // Assert
        expect(value).toBeUndefined();
    });

    it('throws on a write when the DOCUMENT has no window', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideUserPreferences(withSessionStorage()), { provide: DOCUMENT, useValue: { defaultView: null } }] });
        const preferences = TestBed.inject(USER_PREFERENCE_STORAGE);

        // Act
        const write = (): void => preferences.write('wizard.step', 'address', stringCodec);

        // Assert
        expect(write).toThrow(new LocalStorageUnavailableError('wizard.step', 'write'));
    });
});
