// #region Imports

import type { LocalStorageCodec } from './LocalStorageCodec';

// #endregion

/**
 * Creates a codec that persists boolean values with explicit textual representations.
 *
 * @public
 * @param trueValue The serialized representation of `true` (defaults to `'true'`).
 * @param falseValue The serialized representation of `false` (defaults to `'false'`).
 * @returns A frozen boolean codec.
 */
export function booleanCodec(trueValue = 'true', falseValue = 'false'): LocalStorageCodec<boolean> {
    return Object.freeze({
        parse(serializedValue: string): boolean | undefined {
            if (serializedValue === trueValue) {
                return true;
            }

            if (serializedValue === falseValue) {
                return false;
            }

            return undefined;
        },

        serialize(value: boolean): string {
            return value ? trueValue : falseValue;
        },
    });
}
