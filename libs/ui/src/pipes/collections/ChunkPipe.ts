// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

/**
 * Splits a list into rows of a fixed length, which is what a template needs to lay a flat
 * collection out as a grid: `@for (row of items() | ngpChunk: 3; track $index)`.
 *
 * @public
 */
@Pipe({ name: 'ngpChunk' })
export class ChunkPipe implements PipeTransform {
    // #region Methods

    /**
     * Splits `value` into chunks of `size` items; the last chunk holds the remainder.
     *
     * @public
     * @param value The list to split.
     * @param size The number of items per chunk; must be a positive integer.
     * @returns The chunks, or an empty list when there is no value.
     * @throws RangeError When `size` is not a positive integer.
     */
    public transform<TItem>(value: null | ReadonlyArray<TItem> | undefined, size: number): Array<Array<TItem>> {
        if (!Number.isInteger(size) || size <= 0) {
            throw new RangeError('ngpChunk: the chunk size must be a positive integer.');
        }

        if (!value) {
            return [];
        }

        const chunks: Array<Array<TItem>> = [];
        for (let index = 0; index < value.length; index += size) {
            chunks.push(value.slice(index, index + size));
        }

        return chunks;
    }

    // #endregion
}
