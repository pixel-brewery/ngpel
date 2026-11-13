// #region Imports

// #endregion

/**
 * Persisted visibility, width and pinning of one data-table column.
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

    /** Width in CSS pixels after the column was resized. */
    readonly width?: number;

    /** Pinning chosen in the table when layout persistence is enabled. */
    readonly pinned?: 'left' | 'right' | 'none';
}
