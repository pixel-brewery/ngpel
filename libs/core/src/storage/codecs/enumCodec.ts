// #region Imports

import type { LocalStorageCodec } from './LocalStorageCodec';

// #endregion

/**
 * Creates a codec that restricts a persisted string to a compile-time union of allowed values.
 *
 * @public
 * @typeParam T The string union.
 * @param allowedValues The allowed values; anything else parses to `undefined` and refuses to serialize.
 * @returns A frozen enum codec.
 */
export function enumCodec<const T extends string>(allowedValues: readonly T[]): LocalStorageCodec<T> {
    const allowedValueSet = new Set<string>(allowedValues);

    return Object.freeze({
        parse(serializedValue: string): T | undefined {
            return allowedValueSet.has(serializedValue) ? (serializedValue as T) : undefined;
        },

        serialize(value: T): string {
            if (!allowedValueSet.has(value)) {
                throw new TypeError(`Unsupported enum value "${value}".`);
            }

            return value;
        },
    });
}
