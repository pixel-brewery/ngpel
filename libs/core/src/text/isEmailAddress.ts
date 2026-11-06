// The deliberately broad local part permits the RFC 5322 local-part character set, including the
// "+" separator commonly used for RFC 5233 sub-addressing. The domain must be qualified (at least one
// dot) and end in an alphabetic or punycode top-level label.
const EMAIL_ADDRESS_PATTERN =
    /^(?!.*\.\.)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+(?:[\p{L}]{2,63}|xn--[a-z0-9-]{2,59})$/iu;

/**
 * Determines whether text is a non-empty email address with a qualified domain. Surrounding
 * whitespace is ignored. Framework-free so pipes and validators can share one definition.
 *
 * @public
 * @param value The text to test.
 * @returns `true` when the text is a syntactically valid email address.
 */
export function isEmailAddress(value: string): boolean {
    return EMAIL_ADDRESS_PATTERN.test(value.trim());
}
