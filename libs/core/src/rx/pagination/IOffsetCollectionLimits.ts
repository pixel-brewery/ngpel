/** Limits on a complete offset collection load. @public */
export interface IOffsetCollectionLimits {
    /** Maximum number of page requests. Defaults to 1,000. */
    readonly maxPages?: number;

    /** Maximum number of accumulated items. Defaults to 100,000. */
    readonly maxItems?: number;
}
