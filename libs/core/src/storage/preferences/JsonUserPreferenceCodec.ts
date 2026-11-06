// #region Imports

import type { IUserPreferenceCodec } from './IUserPreferenceCodec';

// #endregion

/**
 * JSON preference codec with caller-provided runtime validation. The value is stored as-is; the
 * adapter performs the JSON round trip.
 *
 * @typeParam T The preference value type.
 * @public
 */
export class JsonUserPreferenceCodec<T> implements IUserPreferenceCodec<T> {
    // #region Fields

    private readonly _isValue: (value: unknown) => value is T;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `JsonUserPreferenceCodec` class.
     *
     * @public
     * @param isValue Runtime type guard for parsed payloads.
     */
    public constructor(isValue: (value: unknown) => value is T) {
        this._isValue = isValue;
    }

    // #endregion

    // #region Methods

    /**
     * Validates an unknown preference payload.
     *
     * @public
     * @param value Persisted payload.
     * @returns The payload when it passes the guard, otherwise `undefined`.
     */
    public parse(value: unknown): T | undefined {
        return this._isValue(value) ? value : undefined;
    }

    /**
     * Serializes a typed preference value.
     *
     * @public
     * @param value Preference value.
     * @returns The value unchanged.
     */
    public serialize(value: T): unknown {
        return value;
    }

    // #endregion
}
