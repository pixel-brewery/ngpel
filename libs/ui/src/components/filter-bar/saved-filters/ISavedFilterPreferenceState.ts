// #region Imports

import type { ISavedFilter } from './ISavedFilter';

// #endregion

/**
 * Persisted named filter preference payload.
 *
 * @public
 */
export interface ISavedFilterPreferenceState {
    /**
     * Preference schema version.
     */
    readonly version: 1;

    /**
     * Saved filters for one view.
     */
    readonly filters: ReadonlyArray<ISavedFilter>;
}
