// #region Imports

import type { IValueCodec } from '../codecs/IValueCodec';

// #endregion

/**
 * Serializes and writes one value to a storage area; `undefined` removes the key. This is the
 * framework-free write path for call sites outside an injection context.
 *
 * @public
 * @typeParam T The typed application value.
 * @param storage The storage to write to.
 * @param key The storage key.
 * @param value The value to persist, or `undefined` to remove the key.
 * @param codec The codec used to serialize the value.
 * @returns The serialized representation that was written, or `null` when the key was removed.
 * @throws TypeError when the codec refuses to serialize the value.
 */
export function writeStorageValue<T>(
    storage: Pick<Storage, 'setItem' | 'removeItem'>,
    key: string,
    value: T | undefined,
    codec: IValueCodec<string, T>,
): string | null {
    if (value === undefined) {
        storage.removeItem(key);

        return null;
    }

    const serializedValue = codec.serialize(value);

    storage.setItem(key, serializedValue);

    return serializedValue;
}
