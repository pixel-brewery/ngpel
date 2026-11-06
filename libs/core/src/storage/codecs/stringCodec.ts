// #region Imports

import type { LocalStorageCodec } from './LocalStorageCodec';

// #endregion

/**
 * Preserves plain text values unchanged.
 *
 * @public
 */
export const stringCodec: LocalStorageCodec<string> = Object.freeze({
    parse(serializedValue: string): string | undefined {
        return serializedValue;
    },

    serialize(value: string): string {
        return value;
    },
});
