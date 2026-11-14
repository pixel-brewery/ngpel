/**
 * Describes a trusted website-level legal or company link.
 *
 * @public
 */
export interface ILegalLink {
    /** Human-readable label and fallback when no translation is supplied. */
    readonly label: string;

    /** Optional translation key resolved in the surrounding application. */
    readonly translationKey?: string;

    /**
     * Trusted destination URL.
     *
     * @public
     * @readonly
     */
    readonly url: string;

    /**
     * Whether the destination opens in a separate browser context.
     *
     * @public
     * @readonly
     */
    readonly openInNewTab?: boolean;
}
