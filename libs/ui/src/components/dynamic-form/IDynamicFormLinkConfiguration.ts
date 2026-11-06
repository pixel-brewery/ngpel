/**
 * UI-owned labels for a read-only dynamic link control.
 *
 * @public
 */
export interface IDynamicFormLinkConfiguration {
    /**
     * Accessible label for opening the link.
     *
     * @public
     * @readonly
     */
    readonly openLabel?: string;

    /**
     * Accessible label for copying the link.
     *
     * @public
     * @readonly
     */
    readonly copyLabel?: string;

    /**
     * Status announced after a successful copy.
     *
     * @public
     * @readonly
     */
    readonly copiedLabel?: string;

    /**
     * Status announced when copying fails.
     *
     * @public
     * @readonly
     */
    readonly copyErrorLabel?: string;

    /**
     * Text shown when the value is not a safe link.
     *
     * @public
     * @readonly
     */
    readonly invalidUrlLabel?: string;
}
