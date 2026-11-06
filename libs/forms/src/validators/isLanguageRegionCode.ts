const LANGUAGE_REGION_CODE_PATTERN = /^[a-z]{2}-[A-Z]{2}$/u;

/**
 * Determines whether text is a normalized language-region code such as `de-DE` (lower-case
 * language, upper-case region). Surrounding whitespace is ignored.
 *
 * @public
 * @param value The text to test.
 * @returns `true` when the text is a normalized language-region code.
 */
export function isLanguageRegionCode(value: string): boolean {
    return LANGUAGE_REGION_CODE_PATTERN.test(value.trim());
}
