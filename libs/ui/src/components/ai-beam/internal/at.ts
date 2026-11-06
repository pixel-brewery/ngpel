/**
 * Reads one entry of a fixed table the beam ships itself.
 *
 * The palettes, geometries and ring maps are index-parallel by construction, so a miss is a bug in
 * this package rather than bad input — it throws instead of silently rendering a broken gradient.
 *
 * @internal
 * @typeParam T The entry type.
 * @param table The table to read from.
 * @param index The index to read.
 * @returns The entry at the index.
 */
export function at<T>(table: ReadonlyArray<T>, index: number): T {
    const entry = table[index];

    if (entry === undefined) {
        throw new Error(`ai-beam: the table has no entry at index ${index}.`);
    }

    return entry;
}
