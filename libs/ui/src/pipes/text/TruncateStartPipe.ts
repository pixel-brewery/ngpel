// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

// #region Constants

const DEFAULT_MAXIMUM_LENGTH = 50;
const ELLIPSIS = '...';

// #endregion

/**
 * Shortens text from the front, keeping its end readable: `{{ path | ngpTruncateStart: 30 }}`.
 *
 * File paths, identifiers and URLs carry their distinguishing part at the end, so trimming the
 * front keeps the value recognisable where a trailing ellipsis would not.
 *
 * @public
 */
@Pipe({ name: 'ngpTruncateStart' })
export class TruncateStartPipe implements PipeTransform {
    // #region Methods

    /**
     * Shortens `value` to `maximumLength` characters, prefixing an ellipsis when it was cut.
     *
     * @public
     * @param value The text to shorten.
     * @param maximumLength The maximum number of characters of the result (defaults to 50).
     * @returns The shortened text, or an empty string when there is no text.
     */
    public transform(value: null | string | undefined, maximumLength: number = DEFAULT_MAXIMUM_LENGTH): string {
        if (!value) {
            return '';
        }

        const limit = Number.isFinite(maximumLength) ? Math.max(0, Math.trunc(maximumLength)) : DEFAULT_MAXIMUM_LENGTH;
        if (value.length <= limit) {
            return value;
        }

        if (limit <= ELLIPSIS.length) {
            return ELLIPSIS.slice(0, limit);
        }

        return `${ELLIPSIS}${value.slice(-(limit - ELLIPSIS.length))}`;
    }

    // #endregion
}
