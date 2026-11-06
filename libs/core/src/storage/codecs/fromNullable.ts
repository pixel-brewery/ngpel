// #region Imports

import type { IValueCodec } from './IValueCodec';

// #endregion

/**
 * Lifts a codec so that it also accepts `null` as an absent serialized value. This lets the same
 * validators that back Web Storage (`string`) serve URL parameters (`string | null`) without a
 * second codec set.
 *
 * @public
 * @typeParam TSerialized The serialized representation of the inner codec.
 * @typeParam T The typed application value.
 * @param codec The codec over non-null serialized values.
 * @returns A frozen codec whose `parse(null)` yields `undefined`.
 */
export function fromNullable<TSerialized, T>(codec: IValueCodec<TSerialized, T>): IValueCodec<TSerialized | null, T> {
    return Object.freeze({
        parse(serializedValue: TSerialized | null): T | undefined {
            return serializedValue === null ? undefined : codec.parse(serializedValue);
        },

        serialize(value: T): TSerialized {
            return codec.serialize(value);
        },
    });
}
