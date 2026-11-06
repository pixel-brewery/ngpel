// #region Imports

import type { LocalStorageCodec } from './LocalStorageCodec';

// #endregion

/**
 * Persists positive identifiers and one-based pagination values as safe integers (`1`, `2`, ...).
 *
 * @public
 */
export const positiveIntegerCodec: LocalStorageCodec<number> = Object.freeze({
    parse(serializedValue: string): number | undefined {
        if (!/^[1-9]\d*$/.test(serializedValue)) {
            return undefined;
        }

        const parsedValue = Number(serializedValue);

        return Number.isSafeInteger(parsedValue) ? parsedValue : undefined;
    },

    serialize(value: number): string {
        if (!Number.isSafeInteger(value) || value <= 0) {
            throw new TypeError(`Expected a positive safe integer, received "${value}".`);
        }

        return String(value);
    },
});
