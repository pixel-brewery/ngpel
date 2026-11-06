// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

// #region Constants

const TEL_SCHEME_PATTERN = /^tel:/iu;
const VISUAL_SEPARATOR_PATTERN = /[\s().-]+/gu;
const DIALLABLE_PATTERN = /[\d*#]/u;

// #endregion

/**
 * Turns a phone number into a `tel:` link target: `[href]="contact.phone | ngpTel"`.
 *
 * The visual grouping a number is stored with — spaces, dots, dashes and brackets — is removed,
 * because a dialler must not receive it, and an already prefixed `tel:` is not prefixed twice. A
 * value that holds no diallable character yields `null`, so the template can hide the link.
 *
 * @public
 */
@Pipe({ name: 'ngpTel' })
export class TelPipe implements PipeTransform {
    // #region Methods

    /**
     * Builds the `tel:` link target of `value`.
     *
     * @public
     * @param value The phone number.
     * @returns The `tel:` URL, or `null` when the value is not diallable.
     */
    public transform(value: null | string | undefined): null | string {
        const phoneNumber = (value ?? '').trim().replace(TEL_SCHEME_PATTERN, '').trim().replace(VISUAL_SEPARATOR_PATTERN, '');

        return phoneNumber !== '' && DIALLABLE_PATTERN.test(phoneNumber) ? `tel:${phoneNumber}` : null;
    }

    // #endregion
}
