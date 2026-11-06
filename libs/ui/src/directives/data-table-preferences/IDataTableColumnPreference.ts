// #region Imports

// #endregion

/**
 * Persisted visibility state for one data-table column.
 *
 * @public
 */
export interface IDataTableColumnPreference {
    /**
     * Stable data-table column key.
     *
     * @public
     */
    readonly key: string;

    /**
     * Whether the column is hidden.
     *
     * @public
     */
    readonly hidden: boolean;
}
