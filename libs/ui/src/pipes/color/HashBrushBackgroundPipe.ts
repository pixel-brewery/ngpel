// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';
import { colorFromString } from './colorFromString';

// #endregion

/**
 * Derives a stable background colour from a value, which gives avatars, tags and legend swatches a
 * recognisable tint without storing one: `[style.background-color]="tag.name | ngpHashBrushBackground"`.
 *
 * The value is lower-cased and trimmed before hashing, so `Andre` and ` andre ` share a colour.
 *
 * @public
 */
@Pipe({ name: 'ngpHashBrushBackground' })
export class HashBrushBackgroundPipe implements PipeTransform {
    // #region Methods

    /**
     * Derives the background colour of `value`.
     *
     * @public
     * @param value The value to derive the colour from.
     * @returns The colour as a `#rrggbb` string.
     */
    public transform(value: null | { toString(): string } | undefined): string {
        return colorFromString((value?.toString() ?? '').trim().toLowerCase());
    }

    // #endregion
}
