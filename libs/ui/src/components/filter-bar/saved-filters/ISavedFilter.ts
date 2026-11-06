// #region Imports

import type { FilterValues } from '../IFilterDefinition';

// #endregion

/**
 * Named filter definition persisted for one list view.
 *
 * @public
 */
export interface ISavedFilter {
    /**
     * Stable saved filter id.
     */
    readonly id: string;

    /**
     * User-facing saved filter name.
     */
    readonly name: string;

    /**
     * Persisted filter values.
     */
    readonly values: FilterValues;

    /**
     * ISO timestamp for creation.
     */
    readonly createdAt: string;

    /**
     * ISO timestamp for last update.
     */
    readonly updatedAt: string;
}
