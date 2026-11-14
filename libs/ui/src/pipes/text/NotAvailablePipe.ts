// #region Imports

import { inject, Pipe, type PipeTransform } from '@angular/core';
import { NOT_AVAILABLE_TEXT } from './NOT_AVAILABLE_TEXT';

// #endregion

/**
 * Renders a placeholder instead of an absent value, so a table cell reads as "not filled in" rather
 * than as an empty gap: `{{ contact.phone | ngpNotAvailable }}`.
 *
 * `null`, `undefined` and the empty string are treated as absent; every other value is rendered
 * through its string representation. The default placeholder comes from {@link NOT_AVAILABLE_TEXT}.
 *
 * @public
 */
@Pipe({ name: 'ngpNotAvailable' })
export class NotAvailablePipe implements PipeTransform {
    // #region Fields

    private readonly _placeholder: string = inject(NOT_AVAILABLE_TEXT);

    // #endregion

    // #region Methods

    /**
     * Renders `value`, or the configured placeholder when it is absent.
     *
     * @public
     * @param value The value to render.
     * @param placeholder Overrides the default placeholder for this binding.
     * @returns The string representation of `value`, or the placeholder.
     */
    public transform<TValue>(value: TValue, placeholder = this._placeholder): string {
        if (value === null || value === undefined) {
            return placeholder;
        }

        const text = String(value);

        return text === '' ? placeholder : text;
    }

    // #endregion
}
