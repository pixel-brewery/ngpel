// #region Imports

import type { Signal } from '@angular/core';
import type { FilterValues } from '../IFilterDefinition';
import type { ISavedFilter } from './ISavedFilter';

// #endregion

/**
 * Controller for persisted named filters.
 *
 * @public
 */
export interface ISavedFilterController {
    /**
     * Saved filters for the configured view.
     */
    readonly savedFilters: Signal<ReadonlyArray<ISavedFilter>>;

    /**
     * Saves the supplied filter values under a user-facing name.
     *
     * @param name - Saved filter name.
     * @param values - Filter values.
     */
    save(name: string, values: FilterValues): ISavedFilter | undefined;

    /**
     * Removes a saved filter.
     *
     * @param id - Saved filter id.
     */
    remove(id: string): void;

    /**
     * Finds a saved filter.
     *
     * @param id - Saved filter id.
     */
    find(id: string): ISavedFilter | undefined;
}
