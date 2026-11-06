// #region Imports

import { assertInInjectionContext, DestroyRef, DOCUMENT, inject, signal, type Signal } from '@angular/core';
import { readStorageValue } from '../../browser/readStorageValue';
import { requireStorage } from '../../browser/requireStorage';
import { writeStorageValue } from '../../browser/writeStorageValue';
import { type IValueCodec } from '../../codecs/IValueCodec';
import { BROWSER_STORAGE } from '../BROWSER_STORAGE';
import type { ILocalStorageSignalOptions } from './ILocalStorageSignalOptions';
import { sameDocumentChannel } from './sameDocumentChannel';

// #endregion

/**
 * A storage-backed Angular signal. `set()`, `update()` and `clear()` synchronously write the
 * storage first and then the signal; other instances on the same key in this document are
 * notified directly, other documents through the browser `storage` event.
 *
 * @typeParam T The typed application value.
 * @public
 */
export type LocalStorageSignal<T> = Signal<T | undefined> & {
    // #region Methods

    /**
     * Persists a value; `undefined` removes the key.
     *
     * @throws LocalStorageUnavailableError when storage is unavailable.
     */
    set(value: T | undefined): void;

    /**
     * Re-reads the stored value and persists the updater's result.
     *
     * @throws LocalStorageUnavailableError when storage is unavailable.
     */
    update(updater: (currentValue: T | undefined) => T | undefined): void;

    /**
     * Removes the key.
     *
     * @throws LocalStorageUnavailableError when storage is unavailable.
     */
    clear(): void;

    /**
     * Reloads the current value from storage, for integration with same-document code that writes
     * to storage directly instead of through a signal.
     *
     * @throws LocalStorageUnavailableError when storage is unavailable.
     */
    refresh(): void;

    // #endregion
};

/**
 * Creates a storage-backed signal without exposing an injectable storage service to feature
 * code. Must be called in an injection context (a field initializer or constructor). Co-located
 * with the {@link LocalStorageSignal} type because a separate `localStorageSignal.ts` would collide
 * with `LocalStorageSignal.ts` on case-insensitive file systems.
 *
 * Without storage the signal follows the unavailable-storage policy documented on
 * `LocalStorageUnavailableError`: it reads as `undefined` and every mutation throws that error.
 *
 * @public
 * @typeParam T The typed application value.
 * @param key The storage key.
 * @param codec The codec converting between the stored string and the typed value.
 * @param options Storage, event source and cross-tab overrides.
 * @returns The storage-backed signal.
 */
export function localStorageSignal<T>(key: string, codec: IValueCodec<string, T>, options: ILocalStorageSignalOptions = {}): LocalStorageSignal<T> {
    assertInInjectionContext(localStorageSignal);

    const destroyRef = inject(DestroyRef);
    const storage: Storage | null = options.storage === undefined ? inject(BROWSER_STORAGE) : options.storage;
    const eventTarget: EventTarget | null = options.eventTarget === undefined ? inject(DOCUMENT).defaultView : options.eventTarget;
    const storageEventTarget: EventTarget | null = storage !== null && (options.syncAcrossTabs ?? true) ? eventTarget : null;

    const value = signal<T | undefined>(storage === null ? undefined : readStorageValue(storage, key, codec));

    const applySerializedValue = (serializedValue: string | null): void => {
        value.set(serializedValue === null ? undefined : codec.parse(serializedValue));
    };

    const unsubscribeSameDocument: () => void = storage === null ? (): void => undefined : sameDocumentChannel().subscribe(storage, key, applySerializedValue);

    const handleStorageEvent = (event: Event): void => {
        const storageEvent = event as StorageEvent;

        if (storage === null || storageEvent.storageArea !== storage) {
            return;
        }

        if (storageEvent.key === key) {
            applySerializedValue(storageEvent.newValue);

            return;
        }

        if (storageEvent.key === null) {
            value.set(readStorageValue(storage, key, codec));
        }
    };

    storageEventTarget?.addEventListener('storage', handleStorageEvent);

    destroyRef.onDestroy((): void => {
        unsubscribeSameDocument();
        storageEventTarget?.removeEventListener('storage', handleStorageEvent);
    });

    const set = (nextValue: T | undefined): void => {
        const availableStorage = requireStorage(storage, key, nextValue === undefined ? 'remove' : 'write');
        const serializedValue = writeStorageValue(availableStorage, key, nextValue, codec);

        value.set(nextValue);
        sameDocumentChannel().publish(availableStorage, key, serializedValue, applySerializedValue);
    };

    const refresh = (): void => {
        const availableStorage = requireStorage(storage, key, 'read');

        value.set(readStorageValue(availableStorage, key, codec));
    };

    const update = (updater: (currentValue: T | undefined) => T | undefined): void => {
        if (storage !== null) {
            value.set(readStorageValue(storage, key, codec));
        }

        set(updater(value()));
    };

    const clear = (): void => {
        set(undefined);
    };

    return Object.assign(value.asReadonly(), { set, update, clear, refresh });
}
