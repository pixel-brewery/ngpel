// #region Imports

import type { FilterValues } from '../IFilterDefinition';

// #endregion

/**
 * Request emitted when a user wants to save the current filter values.
 *
 * @public
 */
export interface ISavedFilterCreateRequest {
    /**
     * User-facing saved filter name.
     */
    readonly name: string;

    /**
     * Filter values to persist.
     */
    readonly values: FilterValues;
}
