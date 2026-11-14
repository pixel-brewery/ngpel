/** Labels the application can override for the shared activity view. @public */
export interface IActivityLogLabels {
    readonly heading: string;
    readonly loading: string;
    readonly empty: string;
    readonly emptyDescription?: string;
    readonly error: string;
    readonly errorDescription?: string;
    readonly moreError: string;
    readonly retry: string;
    readonly loadMore: string;
    readonly newChanges: string;
    readonly newChangesDescription?: string;
}
