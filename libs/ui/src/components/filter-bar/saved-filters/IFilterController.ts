// #region Imports

import type { Signal } from '@angular/core';
import type { Command, IPresenterController } from '@pixel-brewery/ngpel-mvp';
import type { FilterValues } from '../IFilterDefinition';
import type { ISavedFilter } from './ISavedFilter';
import type { ISavedFilterCreateRequest } from './ISavedFilterCreateRequest';

// #endregion

/**
 * Controller for list filter visibility, application and saved filters.
 *
 * @public
 */
export interface IFilterController extends IPresenterController {
    /**
     * Active filter values.
     */
    readonly activeFilters: Signal<FilterValues>;

    /**
     * Whether the filter panel is visible.
     */
    readonly isFilterVisible: Signal<boolean>;

    /**
     * Whether a filter is active.
     */
    readonly isFilterActive: Signal<boolean>;

    /**
     * Persisted saved filters.
     */
    readonly savedFilters: Signal<ReadonlyArray<ISavedFilter>>;

    /**
     * Toggles the filter panel.
     */
    readonly toggleFilterCommand: Command<void>;

    /**
     * Closes the filter panel.
     */
    readonly closeFilterCommand: Command<void>;

    /**
     * Applies filter values.
     */
    readonly applyFilterCommand: Command<FilterValues>;

    /**
     * Saves filter values.
     */
    readonly saveFilterCommand: Command<ISavedFilterCreateRequest>;

    /**
     * Applies a saved filter.
     */
    readonly applySavedFilterCommand: Command<string>;

    /**
     * Deletes a saved filter.
     */
    readonly deleteSavedFilterCommand: Command<string>;
}
