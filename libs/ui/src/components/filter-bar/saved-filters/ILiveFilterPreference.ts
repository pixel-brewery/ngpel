// #region Imports

import type { FilterValues } from '../IFilterDefinition';

// #endregion

/**
 * Stores an active filter so the presenter can restore it before the first list load.
 *
 * @public
 */
export interface ILiveFilterPreference {
    /** Stable storage key, distinct from the named filter storage key. */
    readonly storageKey: string;

    /** Opens the filter panel when a nonempty preference is restored. */
    readonly openWhenActive?: boolean;

    /** Restores filter values without issuing a new load. */
    restoreValues(values: FilterValues): void;
}
