// #region Imports

import type { Signal } from '@angular/core';
import type { FilterValues } from '../../components/filter-bar/IFilterDefinition';
import type { IFilterDefinition } from '../../components/filter-bar/IFilterDefinition';
import type { ICollectionExportColumn } from '../exporting/ICollectionExportColumn';
import type { ICollectionExportFilter } from '../exporting/ICollectionExportFilter';
import type { ICollectionCalendarView } from '../views/calendar/ICollectionCalendarView';
import type { ICollectionFlowView } from '../views/flow/ICollectionFlowView';
import type { ICollectionGalleryView } from '../views/gallery/ICollectionGalleryView';
import type { ICollectionTableView } from '../views/table/ICollectionTableView';
import type { ICollectionViewDefinition } from './ICollectionViewDefinition';

// #endregion

/**
 * Runtime collection-view model exposed by feature presenters.
 *
 * @public
 */
export interface ICollectionView<TItem, TView extends string, TCalendarItem = TItem> {
    /**
     * The currently active view. Exactly one view can be active at any time.
     */
    readonly activeView: Signal<TView>;

    /**
     * The view definitions supported by this feature collection.
     */
    readonly availableViews: Signal<ReadonlyArray<ICollectionViewDefinition<TView>>>;

    /**
     * Active filter values.
     */
    readonly activeFilters: Signal<FilterValues>;

    /**
     * Indicates whether at least one filter value is active.
     */
    readonly isFilterActive: Signal<boolean>;

    /**
     * Filter definitions derived from collection fields.
     */
    readonly filterDefinitions: Signal<ReadonlyArray<IFilterDefinition>>;

    /**
     * Export columns derived from collection fields.
     */
    readonly exportColumns: Signal<ReadonlyArray<ICollectionExportColumn>>;

    /**
     * Optional calendar projection.
     */
    readonly calendar?: ICollectionCalendarView<TCalendarItem>;

    /**
     * Optional table projection.
     */
    readonly table?: ICollectionTableView<TItem>;

    /**
     * Optional gallery projection.
     */
    readonly gallery?: ICollectionGalleryView<TItem>;

    /**
     * Optional flow projection.
     */
    readonly flow?: ICollectionFlowView<TItem>;

    /**
     * Activates a supported view type.
     */
    setActiveView(view: TView): void;

    /**
     * Checks if a view can be activated.
     */
    canActivateView(view: string): boolean;

    /**
     * Replaces active filter values.
     */
    setFilterValues(values: FilterValues): void;

    /**
     * Builds export filters from active filter values.
     */
    buildExportFilters(): ReadonlyArray<ICollectionExportFilter>;
}
