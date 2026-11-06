/** One page of entries, ordered newest first by the caller's data source. @public */
export interface IActivityLogPage<T> {
    /** Entries returned for the requested offset. */
    readonly items: ReadonlyArray<T>;
    /** Total entries for the current scope. */
    readonly total: number;
}
