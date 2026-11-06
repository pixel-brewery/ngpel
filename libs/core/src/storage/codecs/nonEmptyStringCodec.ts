// #region Imports

import type { LocalStorageCodec } from './LocalStorageCodec';

// #endregion

/**
 * Accepts meaningful textual values while rejecting empty or whitespace-only persisted state.
 * Values are trimmed on both sides of the boundary.
 *
 * @public
 */
export const nonEmptyStringCodec: LocalStorageCodec<string> = Object.freeze({
    parse(serializedValue: string): string | undefined {
        const value = serializedValue.trim();

        return value.length === 0 ? undefined : value;
    },

    serialize(value: string): string {
        const serializedValue = value.trim();

        if (serializedValue.length === 0) {
            throw new TypeError('Expected a non-empty string value.');
        }

        return serializedValue;
    },
});
