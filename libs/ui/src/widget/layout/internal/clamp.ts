/**
 * Constrains a value to an inclusive range.
 *
 * @param value The value to constrain.
 * @param min The lower bound, inclusive.
 * @param max The upper bound, inclusive.
 * @returns The constrained value.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
