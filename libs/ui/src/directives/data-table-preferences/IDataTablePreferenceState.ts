// #region Imports

import type { IDataTableColumnPreference } from './IDataTableColumnPreference';

// #endregion

/**
 * Persisted state for a Mosaik data-table.
 *
 * @public
 */
export interface IDataTablePreferenceState {
    /**
     * Schema version of the persisted state.
     *
     * @public
     */
    readonly version: 1;

    /**
     * Persisted column preferences.
     *
     * @public
     */
    readonly columns: ReadonlyArray<IDataTableColumnPreference>;
}
