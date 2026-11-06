// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';
import { getContrastingTextColor } from './getContrastingTextColor';

// #endregion

/**
 * Picks the readable text colour for a background colour, and pairs with
 * {@link HashBrushBackgroundPipe}: `[style.color]="(tag.name | ngpHashBrushBackground) | ngpHashBrushForeground"`.
 *
 * @public
 */
@Pipe({ name: 'ngpHashBrushForeground' })
export class HashBrushForegroundPipe implements PipeTransform {
    // #region Methods

    /**
     * Picks the text colour for `backgroundColor`.
     *
     * @public
     * @param backgroundColor The background as a `#rgb` or `#rrggbb` string.
     * @returns `#000000` or `#ffffff`.
     */
    public transform(backgroundColor: null | string | undefined): '#000000' | '#ffffff' {
        return getContrastingTextColor(backgroundColor ?? '');
    }

    // #endregion
}
