/**
 * Determines whether a runtime value is a `Date` instance carrying a valid timestamp.
 *
 * @internal
 * @param value The value to test.
 */
export function isValidDate(value: unknown): value is Date {
    return value instanceof Date && !Number.isNaN(value.getTime());
}
