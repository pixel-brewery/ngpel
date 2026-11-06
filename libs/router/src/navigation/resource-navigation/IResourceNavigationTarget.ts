/**
 * A feature-owned canonical address for a resource.
 *
 * @public
 */
export interface IResourceNavigationTarget {
    /** Semantic key used by other features to locate the resource. */
    readonly targetKey: string;

    /** Source rows that identify the resource, including rows with a different primary identifier. */
    readonly sources?: ReadonlyArray<{
        /** Semantic name of the source. */
        readonly key: string;
        /** Field containing the target resource identifier. */
        readonly idField: string;
    }>;

    /** Optional application policy evaluated when building a link. */
    readonly canNavigate?: (resourceId: string) => boolean;

    /** Creates a root-relative application URL for the resource, including any overlay parameters. */
    readonly createUrl: (resourceId: string) => string;
}
