/**
 * Converts between a serialized representation and a typed application value.
 *
 * `parse()` must return `undefined` for malformed or unsupported serialized values, so persisted
 * data is never trusted as a type assertion. `serialize()` must throw when an application value
 * must not be persisted. One contract backs every storage surface of ngpel: `localStorageSignal`
 * (`TSerialized = string`), the user-preference port (`TSerialized = unknown`) and, through
 * `fromNullable`, URL parameters (`TSerialized = string | null`).
 *
 * @typeParam TSerialized The serialized representation.
 * @typeParam T The typed application value.
 * @public
 */
export interface IValueCodec<TSerialized, T> {
    // #region Methods

    /**
     * Parses one serialized value.
     *
     * @public
     * @param serializedValue The serialized representation.
     * @returns The typed value, or `undefined` when the representation is malformed or unsupported.
     */
    parse(serializedValue: TSerialized): T | undefined;

    /**
     * Serializes one typed value.
     *
     * @public
     * @param value The typed value.
     * @returns The serialized representation.
     * @throws TypeError when the value must not be persisted.
     */
    serialize(value: T): TSerialized;

    // #endregion
}
