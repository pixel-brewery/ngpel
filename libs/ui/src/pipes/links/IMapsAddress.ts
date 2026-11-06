/**
 * A postal address as {@link MapsPipe} reads it. Every part is optional, because the shape mirrors
 * what an API actually returns rather than what a complete address would hold.
 *
 * @public
 */
export interface IMapsAddress {
    /**
     * The city.
     *
     * @public
     */
    readonly city?: null | string;

    /**
     * The country.
     *
     * @public
     */
    readonly country?: null | string;

    /**
     * The postal code.
     *
     * @public
     */
    readonly postalCode?: null | string;

    /**
     * The street without its number.
     *
     * @public
     */
    readonly street?: null | string;

    /**
     * The house number.
     *
     * @public
     */
    readonly streetNumber?: null | string;
}
