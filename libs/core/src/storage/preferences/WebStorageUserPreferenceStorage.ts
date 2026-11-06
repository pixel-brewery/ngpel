// #region Imports

import { requireStorage } from '../browser/requireStorage';
import type { IUserPreferenceCodec } from './IUserPreferenceCodec';
import type { IUserPreferenceStorage } from './IUserPreferenceStorage';

// #endregion

/**
 * Web Storage adapter of the user-preference port. Values are stored as JSON under their key;
 * the codec validates the parsed payload. Backs `withLocalStorage()` and `withSessionStorage()`.
 *
 * Without storage the adapter follows the same unavailable-storage policy as `localStorageSignal`,
 * documented on `LocalStorageUnavailableError`: `read()` yields `undefined`, `write()` and
 * `remove()` throw that error.
 *
 * @public
 */
export class WebStorageUserPreferenceStorage implements IUserPreferenceStorage {
    // #region Fields

    private readonly _storage: Storage | null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `WebStorageUserPreferenceStorage` class.
     *
     * @public
     * @param storage The backing storage, or `null` when storage is unavailable.
     */
    public constructor(storage: Storage | null) {
        this._storage = storage;
    }

    // #endregion

    // #region Methods

    /**
     * Reads a typed preference from storage.
     *
     * @public
     * @typeParam T The preference value type.
     * @param key Stable preference key.
     * @param codec Codec used to validate the stored payload.
     * @returns The value, or `undefined` when storage is unavailable, empty or holds invalid JSON.
     */
    public read<T>(key: string, codec: IUserPreferenceCodec<T>): T | undefined {
        if (this._storage === null) {
            return undefined;
        }

        const serializedValue = this._storage.getItem(key);

        if (serializedValue === null || serializedValue.length === 0) {
            return undefined;
        }

        try {
            return codec.parse(JSON.parse(serializedValue));
        } catch {
            return undefined;
        }
    }

    /**
     * Writes a typed preference to storage as JSON.
     *
     * @public
     * @typeParam T The preference value type.
     * @param key Stable preference key.
     * @param value Preference value.
     * @param codec Codec used to serialize the value.
     * @throws LocalStorageUnavailableError when storage is unavailable.
     */
    public write<T>(key: string, value: T, codec: IUserPreferenceCodec<T>): void {
        requireStorage(this._storage, key, 'write').setItem(key, JSON.stringify(codec.serialize(value)));
    }

    /**
     * Removes a preference from storage.
     *
     * @public
     * @param key Stable preference key.
     * @throws LocalStorageUnavailableError when storage is unavailable.
     */
    public remove(key: string): void {
        requireStorage(this._storage, key, 'remove').removeItem(key);
    }

    // #endregion
}
