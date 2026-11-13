/** A single-level grouped collection request, independent of the source transport. */
export interface ICollectionTablePageQuery {
    readonly groupBy?: string;
    readonly groupValue?: unknown;
    readonly groupsOnly?: boolean;
    readonly sortBy?: string;
    readonly sortDirection: 'asc' | 'desc';
}
