/**
 * A page or a combined result from an offset-paginated collection.
 *
 * @public
 * @typeParam T The collection item type.
 */
export interface IOffsetCollectionPage<T> {
    /** Items returned by the request. */
    readonly items: ReadonlyArray<T>;

    /** The latest total reported by the collection endpoint. */
    readonly total: number;
}
