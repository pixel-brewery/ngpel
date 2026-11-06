/** Data provided to the caller's projected activity entry template. @public */
export interface IActivityLogEntryContext<T> {
    /** Entry returned by the controller's data source. */
    readonly $implicit: T;
}
