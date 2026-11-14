// #region Imports

import { inject, Pipe, type PipeTransform } from '@angular/core';
import { BYTES_FALLBACK_TEXT } from './BYTES_FALLBACK_TEXT';
import { byteSize } from './byteSize';

// #endregion

/**
 * Renders a byte count as a human readable size: `{{ file.size | ngpBytes }}`.
 *
 * Delegates to {@link byteSize}; the text for an unknown size comes from
 * {@link BYTES_FALLBACK_TEXT}.
 *
 * @public
 */
@Pipe({ name: 'ngpBytes' })
export class BytesPipe implements PipeTransform {
    // #region Fields

    private readonly _fallback: string = inject(BYTES_FALLBACK_TEXT);

    // #endregion

    // #region Methods

    /**
     * Formats `value` as a human readable size.
     *
     * @public
     * @param value The number of bytes.
     * @param locale The current locale, when the caller needs localized number formatting.
     * @returns The formatted size, or the configured fallback for an unknown size.
     */
    public transform(value: null | number | undefined, locale?: string): string {
        return byteSize(value, this._fallback, locale);
    }

    // #endregion
}
