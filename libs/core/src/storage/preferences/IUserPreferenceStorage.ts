// #region Imports

import type { IUserPreferenceCodec } from './IUserPreferenceCodec';

// #endregion

/**
 * Storage port for user-scoped preferences. Adapters decide where preferences live (Web Storage,
 * an Electron bridge, an in-memory map); consumers only see typed reads and writes.
 *
 * @public
 */
export interface IUserPreferenceStorage {
    // #region Methods

    /**
     * Reads a typed preference value.
     *
     * @public
     * @typeParam T The preference value type.
     * @param key Stable preference key.
     * @param codec Codec used to validate the stored payload.
     * @returns The value, or `undefined` when nothing valid is stored.
     */
    read<T>(key: string, codec: IUserPreferenceCodec<T>): T | undefined;

    /**
     * Writes a typed preference value.
     *
     * @public
     * @typeParam T The preference value type.
     * @param key Stable preference key.
     * @param value Preference value.
     * @param codec Codec used to serialize the value.
     */
    write<T>(key: string, value: T, codec: IUserPreferenceCodec<T>): void;

    /**
     * Removes one preference value.
     *
     * @public
     * @param key Stable preference key.
     */
    remove(key: string): void;

    // #endregion
}
