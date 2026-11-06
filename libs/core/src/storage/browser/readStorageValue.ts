// #region Imports

import type { IValueCodec } from '../codecs/IValueCodec';

// #endregion

/**
 * Reads and parses one value from a storage area. This is the framework-free read path for call
 * sites outside an injection context, such as bootstrap configuration.
 *
 * @public
 * @typeParam T The typed application value.
 * @param storage The storage to read from.
 * @param key The storage key.
 * @param codec The codec used to parse the persisted representation.
 * @returns The parsed value, or `undefined` when nothing is stored or the stored value is invalid.
 */
export function readStorageValue<T>(storage: Pick<Storage, 'getItem'>, key: string, codec: IValueCodec<string, T>): T | undefined {
    const serializedValue = storage.getItem(key);

    return serializedValue === null ? undefined : codec.parse(serializedValue);
}
