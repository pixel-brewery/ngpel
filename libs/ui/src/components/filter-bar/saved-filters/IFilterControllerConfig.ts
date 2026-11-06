// #region Imports

import type { Signal } from '@angular/core';
import type { FilterValues } from '../IFilterDefinition';
import type { ILiveFilterPreference } from './ILiveFilterPreference';

// #endregion

/**
 * Configuration for `createFilterController()`.
 *
 * @public
 */
export interface IFilterControllerConfig {
    /**
     * Stable preference key used for named saved filters.
     */
    readonly savedFilterStorageKey: string;

    /** Optional persistence for the active filter, separate from named saved filters. */
    readonly livePreference?: ILiveFilterPreference;

    /**
     * Active filter values owned by the concrete list presenter.
     */
    readonly activeFilters: Signal<FilterValues>;

    /**
     * Whether a filter is active.
     */
    readonly isFilterActive: Signal<boolean>;

    /**
     * Applies filter values in the concrete list presenter.
     */
    readonly applyFilterValues: (values: FilterValues) => void;
}
