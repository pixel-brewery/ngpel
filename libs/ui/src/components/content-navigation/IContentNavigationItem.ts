/**
 * Describes a stable in-page destination exposed by a content navigation.
 *
 * @public
 */
export interface IContentNavigationItem {
    /**
     * Stable HTML anchor identifier without a leading hash.
     *
     * @public
     * @readonly
     */
    readonly id: string;

    /**
     * Human-readable navigation label.
     *
     * @public
     * @readonly
     */
    readonly label: string;

    /**
     * Semantic outline level from one through six.
     *
     * @public
     * @readonly
     */
    readonly level?: number;

    /**
     * Optional explicit ordering value. DOM registration order is used otherwise.
     *
     * @public
     * @readonly
     */
    readonly order?: number;
}
