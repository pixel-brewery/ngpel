/** A bounded page of rows, or group paths and full filtered counts from the source. */
export interface ICollectionTablePage<T> {
    readonly items: ReadonlyArray<T>;
    /** The filtered collection total, or the leaf-group total for a scoped page. */
    readonly total: number;
    /** Counts for all group paths at each level of the filtered collection. */
    readonly groups?: ReadonlyArray<{ readonly path: ReadonlyArray<unknown>; readonly count: number }>;
}
