/**
 * Splits a two-part CSS value such as `'33% -7.4%'` or `'120px 90px'` into its two halves.
 *
 * @internal
 * @param value The value to split.
 * @returns The two halves; a missing half becomes `'0'`.
 */
export function splitPair(value: string): readonly [string, string] {
    const [first, second] = value.split(' ');

    return [first ?? '0', second ?? '0'];
}
