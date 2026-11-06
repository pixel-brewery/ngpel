// #region Imports

import type { LocalStorageCodec } from './LocalStorageCodec';

// #endregion

/**
 * Creates a codec that persists structured JSON only after runtime validation. Validation is
 * mandatory because storage is mutable outside the application and persisted data must not be
 * trusted as a TypeScript type assertion.
 *
 * @public
 * @typeParam T The structured value type.
 * @param isValue Runtime type guard applied to parsed payloads and to values before persisting.
 * @returns A frozen JSON codec.
 */
export function jsonCodec<T>(isValue: (candidate: unknown) => candidate is T): LocalStorageCodec<T> {
    return Object.freeze({
        parse(serializedValue: string): T | undefined {
            try {
                const candidate: unknown = JSON.parse(serializedValue);

                return isValue(candidate) ? candidate : undefined;
            } catch {
                return undefined;
            }
        },

        serialize(value: T): string {
            if (!isValue(value)) {
                throw new TypeError('Attempted to persist an invalid structured value.');
            }

            return JSON.stringify(value);
        },
    });
}
