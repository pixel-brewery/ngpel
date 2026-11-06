// #region Imports

import type { LocalStorageCodec } from './LocalStorageCodec';

// #endregion

/**
 * Persists zero-based offsets and counters as safe integers (`0`, `1`, ...). Only the canonical
 * decimal representation parses, matching `positiveIntegerCodec`: a padded `"007"` did not come
 * from this codec and is treated as foreign data rather than silently coerced.
 *
 * @public
 */
export const nonNegativeIntegerCodec: LocalStorageCodec<number> = Object.freeze({
    parse(serializedValue: string): number | undefined {
        if (!/^(?:0|[1-9]\d*)$/.test(serializedValue)) {
            return undefined;
        }

        const parsedValue = Number(serializedValue);

        return Number.isSafeInteger(parsedValue) ? parsedValue : undefined;
    },

    serialize(value: number): string {
        if (!Number.isSafeInteger(value) || value < 0) {
            throw new TypeError(`Expected a non-negative safe integer, received "${value}".`);
        }

        return String(value);
    },
});
