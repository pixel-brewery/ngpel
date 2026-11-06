import { createEnvironmentInjector, DOCUMENT, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LocalStorageUnavailableError } from '../../browser/LocalStorageUnavailableError';
import { booleanCodec } from '../../codecs/booleanCodec';
import type { IValueCodec } from '../../codecs/IValueCodec';
import { nonEmptyStringCodec } from '../../codecs/nonEmptyStringCodec';
import { stringCodec } from '../../codecs/stringCodec';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { provideBrowserStorage } from '../provideBrowserStorage';
import { withStorage } from '../withStorage';
import type { ILocalStorageSignalOptions } from './ILocalStorageSignalOptions';
import { type LocalStorageSignal, localStorageSignal } from './LocalStorageSignal';

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

/** An event target that raises browser-like `storage` events on demand. */
interface IStorageEventTarget extends EventTarget {
    dispatchStorageEvent(init: Pick<StorageEventInit, 'key' | 'newValue' | 'oldValue' | 'storageArea'>): void;
}

/** Creates a stand-in for the window's `storage` event source, so another document's write can be simulated. */
function createStorageEventTarget(): IStorageEventTarget {
    class StorageEventTarget extends EventTarget implements IStorageEventTarget {
        public dispatchStorageEvent(init: Pick<StorageEventInit, 'key' | 'newValue' | 'oldValue' | 'storageArea'>): void {
            this.dispatchEvent(
                Object.assign(new Event('storage'), {
                    key: init.key ?? null,
                    newValue: init.newValue ?? null,
                    oldValue: init.oldValue ?? null,
                    storageArea: init.storageArea ?? null,
                }),
            );
        }
    }

    return new StorageEventTarget();
}

function createScope(): EnvironmentInjector {
    return createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
}

function createSignal<T>(
    key: string,
    codec: IValueCodec<string, T>,
    options: ILocalStorageSignalOptions,
    scope: EnvironmentInjector = createScope(),
): LocalStorageSignal<T> {
    return runInInjectionContext(scope, () => localStorageSignal(key, codec, options));
}

describe('localStorageSignal', () => {
    let mockStorage: Storage;

    beforeEach(() => {
        mockStorage = createMockStorage();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('with booleanCodec', () => {
        function createBooleanSignal(storage: Storage, key: string): LocalStorageSignal<boolean> {
            return createSignal(key, booleanCodec(), { storage, eventTarget: null });
        }

        it('returns undefined when no value is stored', () => {
            // Arrange
            const key = 'test.key';

            // Act
            const sig = createBooleanSignal(mockStorage, key);

            // Assert
            expect(sig()).toBeUndefined();
        });

        it('reads stored "true" on initialization', () => {
            // Arrange
            mockStorage.setItem('test.key', 'true');

            // Act
            const sig = createBooleanSignal(mockStorage, 'test.key');

            // Assert
            expect(sig()).toBe(true);
        });

        it('reads stored "false" on initialization', () => {
            // Arrange
            mockStorage.setItem('test.key', 'false');

            // Act
            const sig = createBooleanSignal(mockStorage, 'test.key');

            // Assert
            expect(sig()).toBe(false);
        });

        it('persists false to storage on set', () => {
            // Arrange
            const sig = createBooleanSignal(mockStorage, 'test.key');

            // Act
            sig.set(false);

            // Assert
            expect(mockStorage.getItem('test.key')).toBe('false');
            expect(sig()).toBe(false);
        });

        it('persists true to storage on set', () => {
            // Arrange
            const sig = createBooleanSignal(mockStorage, 'test.key');

            // Act
            sig.set(true);

            // Assert
            expect(mockStorage.getItem('test.key')).toBe('true');
            expect(sig()).toBe(true);
        });

        it('removes the item from storage on clear', () => {
            // Arrange
            mockStorage.setItem('test.key', 'true');
            const sig = createBooleanSignal(mockStorage, 'test.key');

            // Act
            sig.clear();

            // Assert
            expect(mockStorage.getItem('test.key')).toBeNull();
            expect(sig()).toBeUndefined();
        });

        it('removes the item from storage when set to undefined', () => {
            // Arrange
            mockStorage.setItem('test.key', 'false');
            const sig = createBooleanSignal(mockStorage, 'test.key');

            // Act
            sig.set(undefined);

            // Assert
            expect(mockStorage.getItem('test.key')).toBeNull();
            expect(sig()).toBeUndefined();
        });

        it('survives a simulated reload by reading pre-set storage', () => {
            // Arrange
            const firstSession = createBooleanSignal(mockStorage, 'nav.open');
            firstSession.set(false);

            // Act
            const secondSession = createBooleanSignal(mockStorage, 'nav.open');

            // Assert
            expect(mockStorage.getItem('nav.open')).toBe('false');
            expect(secondSession()).toBe(false);
        });

        it('distinguishes false from undefined after reload', () => {
            // Arrange
            mockStorage.setItem('nav.open', 'false');

            // Act
            const sig = createBooleanSignal(mockStorage, 'nav.open');

            // Assert
            expect(sig()).not.toBeUndefined();
            expect(sig()).toBe(false);
        });
    });

    describe('mutations', () => {
        it('re-reads storage before applying the updater', () => {
            // Arrange
            const sig = createSignal('counter', stringCodec, { storage: mockStorage, eventTarget: null });
            mockStorage.setItem('counter', 'external');

            // Act
            sig.update((current) => `${current ?? 'none'}+1`);

            // Assert
            expect(sig()).toBe('external+1');
            expect(mockStorage.getItem('counter')).toBe('external+1');
        });

        it('reloads a value written directly to storage on refresh', () => {
            // Arrange
            const sig = createSignal('view', stringCodec, { storage: mockStorage, eventTarget: null });
            mockStorage.setItem('view', 'gallery');

            // Act
            sig.refresh();

            // Assert
            expect(sig()).toBe('gallery');
        });

        it('leaves storage and signal untouched when the codec refuses the value', () => {
            // Arrange
            mockStorage.setItem('view', 'table');
            const sig = createSignal('view', nonEmptyStringCodec, { storage: mockStorage, eventTarget: null });

            // Act
            const set = (): void => sig.set('   ');

            // Assert
            expect(set).toThrow(TypeError);
            expect(mockStorage.getItem('view')).toBe('table');
            expect(sig()).toBe('table');
        });

        it('requires an injection context', () => {
            // Arrange
            const key = 'outside';

            // Act
            const create = (): unknown => localStorageSignal(key, stringCodec);

            // Assert
            expect(create).toThrow(/injection context/);
        });
    });

    describe('unavailable storage', () => {
        it('reads undefined and never listens for storage events', () => {
            // Arrange
            const eventTarget = createStorageEventTarget();
            const addEventListener = vi.spyOn(eventTarget, 'addEventListener');

            // Act
            const sig = createSignal('nav.open', booleanCodec(), { storage: null, eventTarget });

            // Assert
            expect(sig()).toBeUndefined();
            expect(addEventListener).not.toHaveBeenCalled();
        });

        it('throws a LocalStorageUnavailableError with the operation for every mutation', () => {
            // Arrange
            const sig = createSignal('nav.open', booleanCodec(), { storage: null, eventTarget: null });

            // Act
            const attempts = [(): void => sig.set(true), (): void => sig.clear(), (): void => sig.update(() => false), (): void => sig.refresh()];

            // Assert
            expect(attempts[0]).toThrow(new LocalStorageUnavailableError('nav.open', 'write'));
            expect(attempts[1]).toThrow(new LocalStorageUnavailableError('nav.open', 'remove'));
            expect(attempts[2]).toThrow(LocalStorageUnavailableError);
            expect(attempts[3]).toThrow(new LocalStorageUnavailableError('nav.open', 'read'));
        });
    });

    describe('injected defaults', () => {
        it('resolves storage through BROWSER_STORAGE', () => {
            // Arrange
            mockStorage.setItem('nav.open', 'true');
            TestBed.configureTestingModule({ providers: [provideBrowserStorage(withStorage(mockStorage))] });

            // Act
            const sig = createSignal('nav.open', booleanCodec(), { eventTarget: null });

            // Assert
            expect(sig()).toBe(true);
        });

        it('listens on the DOCUMENT window for storage events of the bound storage', () => {
            // Arrange
            TestBed.configureTestingModule({ providers: [provideBrowserStorage(withStorage(mockStorage))] });
            const sig = createSignal('nav.open', booleanCodec(), {});

            // Act
            window.dispatchEvent(Object.assign(new Event('storage'), { key: 'nav.open', newValue: 'true', oldValue: null, storageArea: mockStorage }));

            // Assert
            expect(sig()).toBe(true);
        });

        it('disables cross-document synchronization when the DOCUMENT has no window', () => {
            // Arrange
            TestBed.configureTestingModule({
                providers: [provideBrowserStorage(withStorage(mockStorage)), { provide: DOCUMENT, useValue: { defaultView: null } }],
            });

            // Act
            const sig = createSignal('nav.open', booleanCodec(), {});

            // Assert
            expect(sig()).toBeUndefined();
        });
    });

    describe('same-document broadcast', () => {
        it('updates another signal on the same key and storage', () => {
            // Arrange
            const first = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget: null });
            const second = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget: null });

            // Act
            first.set(true);

            // Assert
            expect(second()).toBe(true);
        });

        it('propagates a clear as undefined', () => {
            // Arrange
            mockStorage.setItem('nav.open', 'true');
            const first = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget: null });
            const second = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget: null });

            // Act
            first.clear();

            // Assert
            expect(second()).toBeUndefined();
        });

        it('does not touch signals on other keys or other storages', () => {
            // Arrange
            const source = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget: null });
            const otherKey = createSignal('nav.pinned', booleanCodec(), { storage: mockStorage, eventTarget: null });
            const otherStorage = createSignal('nav.open', booleanCodec(), { storage: createMockStorage(), eventTarget: null });

            // Act
            source.set(true);

            // Assert
            expect(otherKey()).toBeUndefined();
            expect(otherStorage()).toBeUndefined();
        });

        it('stops notifying a signal whose injection context was destroyed', () => {
            // Arrange
            const scope = createScope();
            const destroyed = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget: null }, scope);
            const source = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget: null });
            scope.destroy();

            // Act
            source.set(true);

            // Assert
            expect(destroyed()).toBeUndefined();
        });
    });

    describe('cross-document storage events', () => {
        it('applies the new value of an event for its key', () => {
            // Arrange
            const eventTarget = createStorageEventTarget();
            const sig = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget });

            // Act
            eventTarget.dispatchStorageEvent({ key: 'nav.open', newValue: 'true', storageArea: mockStorage });

            // Assert
            expect(sig()).toBe(true);
        });

        it('treats a null new value as removal', () => {
            // Arrange
            mockStorage.setItem('nav.open', 'true');
            const eventTarget = createStorageEventTarget();
            const sig = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget });

            // Act
            eventTarget.dispatchStorageEvent({ key: 'nav.open', newValue: null, storageArea: mockStorage });

            // Assert
            expect(sig()).toBeUndefined();
        });

        it('re-reads storage when the whole area was cleared (key null)', () => {
            // Arrange
            mockStorage.setItem('nav.open', 'true');
            const eventTarget = createStorageEventTarget();
            const sig = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget });
            mockStorage.clear();

            // Act
            eventTarget.dispatchStorageEvent({ key: null, newValue: null, storageArea: mockStorage });

            // Assert
            expect(sig()).toBeUndefined();
        });

        it('ignores events of another key', () => {
            // Arrange
            const eventTarget = createStorageEventTarget();
            const sig = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget });

            // Act
            eventTarget.dispatchStorageEvent({ key: 'nav.pinned', newValue: 'true', storageArea: mockStorage });

            // Assert
            expect(sig()).toBeUndefined();
        });

        it('ignores events of another storage area', () => {
            // Arrange
            const eventTarget = createStorageEventTarget();
            const sig = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget });

            // Act
            eventTarget.dispatchStorageEvent({ key: 'nav.open', newValue: 'true', storageArea: createMockStorage() });

            // Assert
            expect(sig()).toBeUndefined();
        });

        it('does not subscribe when syncAcrossTabs is false', () => {
            // Arrange
            const eventTarget = createStorageEventTarget();
            const addEventListener = vi.spyOn(eventTarget, 'addEventListener');
            const sig = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget, syncAcrossTabs: false });

            // Act
            eventTarget.dispatchStorageEvent({ key: 'nav.open', newValue: 'true', storageArea: mockStorage });

            // Assert
            expect(sig()).toBeUndefined();
            expect(addEventListener).not.toHaveBeenCalled();
        });

        it('removes its listener when the injection context is destroyed', () => {
            // Arrange
            const scope = createScope();
            const eventTarget = createStorageEventTarget();
            const removeEventListener = vi.spyOn(eventTarget, 'removeEventListener');
            createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget }, scope);

            // Act
            scope.destroy();

            // Assert
            expect(removeEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
        });

        it('ignores storage events dispatched after the injection context was destroyed', () => {
            // Arrange
            const scope = createScope();
            const eventTarget = createStorageEventTarget();
            const sig = createSignal('nav.open', booleanCodec(), { storage: mockStorage, eventTarget }, scope);
            scope.destroy();

            // Act
            eventTarget.dispatchStorageEvent({ key: 'nav.open', newValue: 'true', storageArea: mockStorage });

            // Assert
            expect(sig()).toBeUndefined();
        });
    });
});
