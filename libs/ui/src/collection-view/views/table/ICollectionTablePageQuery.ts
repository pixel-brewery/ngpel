/** A grouped collection request, independent of the source transport. */
export interface ICollectionTablePageQuery {
    /** Grouped column keys ordered from outermost to innermost. */
    readonly groupBy?: ReadonlyArray<string>;
    /** Values of the requested leaf group, ordered to match the grouped columns. */
    readonly groupPath?: ReadonlyArray<unknown>;
    /** Whether to return the group counts for the full filtered collection. */
    readonly groupsOnly?: boolean;
    readonly sortBy?: string;
    readonly sortDirection: 'asc' | 'desc';
}
