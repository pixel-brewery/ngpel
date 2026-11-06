/**
 * Describes a trusted website-level legal or company link.
 *
 * @public
 */
export interface ILegalLink {
    /**
     * Human-readable link label.
     *
     * @public
     * @readonly
     */
    readonly label: string;

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
