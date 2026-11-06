// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

// #region Constants

const MAILTO_SCHEME_PATTERN = /^mailto:/iu;

/**
 * Mirrors `isEmailAddress` of `@pixel-brewery/ngpel-core`, which stays the canonical definition.
 * The pattern is repeated here on purpose: the `pipes` entry point declares `@angular/core` as its
 * only peer, so formatting an address in a template must not pull a second package into the bundle.
 */
const EMAIL_ADDRESS_PATTERN =
    /^(?!.*\.\.)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+(?:[\p{L}]{2,63}|xn--[a-z0-9-]{2,59})$/iu;

// #endregion

/**
 * Turns an email address into a `mailto:` link target: `[href]="contact.email | ngpMail"`.
 *
 * An already prefixed `mailto:` is not prefixed twice, and an address that is not syntactically
 * valid yields `null`, so the template can render plain text instead of a link that cannot work.
 *
 * @public
 */
@Pipe({ name: 'ngpMail' })
export class MailPipe implements PipeTransform {
    // #region Methods

    /**
     * Builds the `mailto:` link target of `value`.
     *
     * @public
     * @param value The email address.
     * @returns The `mailto:` URL, or `null` when the value is not an email address.
     */
    public transform(value: null | string | undefined): null | string {
        const address = (value ?? '').trim().replace(MAILTO_SCHEME_PATTERN, '').trim();

        return address !== '' && EMAIL_ADDRESS_PATTERN.test(address) ? `mailto:${address}` : null;
    }

    // #endregion
}
