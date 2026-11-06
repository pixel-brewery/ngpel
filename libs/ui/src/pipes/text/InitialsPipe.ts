// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

// #region Constants

const WHITESPACE_PATTERN = /\s+/u;
const MAXIMUM_INITIALS = 2;

// #endregion

/**
 * Reduces a display name to at most two upper-case initials for avatar fallbacks:
 * `{{ user.displayName | ngpInitials }}` renders `AW` for `Andre Wehlert`.
 *
 * @public
 */
@Pipe({ name: 'ngpInitials' })
export class InitialsPipe implements PipeTransform {
    // #region Methods

    /**
     * Builds the initials of a display name.
     *
     * @public
     * @param value The display name.
     * @returns Up to two upper-case initials, or an empty string when there is no name.
     */
    public transform(value: null | string | undefined): string {
        return (value ?? '')
            .trim()
            .split(WHITESPACE_PATTERN)
            .filter((part) => part.length > 0)
            .slice(0, MAXIMUM_INITIALS)
            .map((part) => part.charAt(0))
            .join('')
            .toLocaleUpperCase();
    }

    // #endregion
}
