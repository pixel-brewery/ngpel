/**
 * Export filter metadata derived from active collection filters.
 *
 * @public
 */
export interface ICollectionExportFilter {
    /**
     * Field key to filter on.
     */
    readonly key: string;

    /**
     * Filter operator.
     */
    readonly operator: 'eq' | 'neq' | 'contains' | 'startsWith' | 'gt' | 'gte' | 'lt' | 'lte';

    /**
     * Filter value coerced for backend export APIs.
     */
    readonly value: string;
}
