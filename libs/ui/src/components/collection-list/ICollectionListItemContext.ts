/**
 * Template context supplied for one collection-list item.
 *
 * @typeParam T - Collection item type.
 * @public
 */
export interface ICollectionListItemContext<T> {
    /**
     * Current collection item.
     *
     * @public
     * @readonly
     */
    readonly $implicit: T;

    /**
     * Zero-based position of the item in the collection.
     *
     * @public
     * @readonly
     */
    readonly index: number;
}
