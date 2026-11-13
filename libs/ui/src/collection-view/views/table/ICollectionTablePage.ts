/** A bounded page of rows, or group values and full filtered counts from the source. */
export interface ICollectionTablePage<T> {
    readonly items: ReadonlyArray<T>;
    readonly total: number;
    readonly groups?: ReadonlyArray<{ readonly value: unknown; readonly count: number }>;
}
