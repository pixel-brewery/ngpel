// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import type { FilterTypeValue } from '../../components/filter-bar/IFilterDefinition';
import type { FilterValues } from '../../components/filter-bar/IFilterDefinition';
import type { IFilterDefinition } from '../../components/filter-bar/IFilterDefinition';
import { CollectionViewKind } from '../core/CollectionViewKind';
import type { ICollectionView } from '../core/ICollectionView';
import type { ICollectionViewConfig } from '../core/ICollectionViewConfig';
import type { ICollectionViewDefinition } from '../core/ICollectionViewDefinition';
import type { ICollectionExportColumn } from '../exporting/ICollectionExportColumn';
import type { ICollectionExportFilter } from '../exporting/ICollectionExportFilter';
import type { ICollectionField } from '../fields/ICollectionField';
import type { ICollectionCalendarView } from '../views/calendar/ICollectionCalendarView';
import type { ICollectionCalendarViewConfig } from '../views/calendar/ICollectionCalendarViewConfig';
import type { ICollectionFlowView } from '../views/flow/ICollectionFlowView';
import type { ICollectionFlowViewConfig } from '../views/flow/ICollectionFlowViewConfig';
import { createFlowColumnExpansionPreference } from '../views/flow/FlowColumnExpansionPreference';
import type { ICollectionGalleryView } from '../views/gallery/ICollectionGalleryView';
import type { ICollectionGalleryViewConfig } from '../views/gallery/ICollectionGalleryViewConfig';
import type { ICollectionTableView } from '../views/table/ICollectionTableView';
import type { ICollectionTableViewConfig } from '../views/table/ICollectionTableViewConfig';

// #endregion

/**
 * Creates a signal-based collection-view model from a declarative configuration.
 *
 * @param config - The collection-view configuration.
 * @returns The runtime collection-view model.
 *
 * @public
 */
export function createCollectionView<TItem, TView extends string, TCalendarItem = TItem>(
    config: ICollectionViewConfig<TItem, TView, TCalendarItem>,
): ICollectionView<TItem, TView, TCalendarItem> {
    return new CollectionView<TItem, TView, TCalendarItem>(config);
}

/**
 * @private
 */
class CollectionView<TItem, TView extends string, TCalendarItem = TItem> implements ICollectionView<TItem, TView, TCalendarItem> {
    // #region Fields

    public readonly table?: ICollectionTableView<TItem>;
    public readonly gallery?: ICollectionGalleryView<TItem>;
    public readonly flow?: ICollectionFlowView<TItem>;
    public readonly calendar?: ICollectionCalendarView<TCalendarItem>;

    private readonly _activeView: WritableSignal<TView>;
    private readonly _availableViews: Signal<ReadonlyArray<ICollectionViewDefinition<TView>>>;
    private readonly _activeFilters: WritableSignal<FilterValues>;
    private readonly _isFilterActive: Signal<boolean>;
    private readonly _filterDefinitions: Signal<ReadonlyArray<IFilterDefinition>>;
    private readonly _exportColumns: Signal<ReadonlyArray<ICollectionExportColumn>>;
    private readonly _viewTypes: ReadonlySet<string>;

    // #endregion

    // #region Ctor

    public constructor(config: ICollectionViewConfig<TItem, TView, TCalendarItem>) {
        const viewDefinitions = config.views.map((view) => ({
            type: view.type,
            label: view.label,
            iconName: view.iconName,
        }));
        const defaultView = viewDefinitions.some((view) => view.type === config.defaultView) ? config.defaultView : viewDefinitions[0]?.type;

        if (!defaultView) {
            throw new Error('Collection view requires at least one view definition.');
        }

        this._activeView = signal(defaultView);
        this._availableViews = signal(viewDefinitions).asReadonly();
        this._activeFilters = signal({});
        this._isFilterActive = computed(() => Object.values(this._activeFilters()).some((value) => this.hasFilterValue(value)));
        this._filterDefinitions = signal(this.buildFilterDefinitions(config.fields)).asReadonly();
        this._exportColumns = signal(this.buildExportColumns(config.fields)).asReadonly();
        this._viewTypes = new Set(viewDefinitions.map((view) => view.type));
        this.table = this.createTableView(config.fields, this.getTableViewConfig(config.views));
        this.gallery = this.createGalleryView(this.getGalleryViewConfig(config.views));
        this.flow = this.createFlowView(this.getFlowViewConfig(config.views));
        this.calendar = this.createCalendarView(this.getCalendarViewConfig(config.views));
    }

    // #endregion

    // #region Properties

    public get activeView(): Signal<TView> {
        return this._activeView.asReadonly();
    }

    public get availableViews(): Signal<ReadonlyArray<ICollectionViewDefinition<TView>>> {
        return this._availableViews;
    }

    public get activeFilters(): Signal<FilterValues> {
        return this._activeFilters.asReadonly();
    }

    public get isFilterActive(): Signal<boolean> {
        return this._isFilterActive;
    }

    public get filterDefinitions(): Signal<ReadonlyArray<IFilterDefinition>> {
        return this._filterDefinitions;
    }

    public get exportColumns(): Signal<ReadonlyArray<ICollectionExportColumn>> {
        return this._exportColumns;
    }

    // #endregion

    // #region Methods

    public setActiveView(view: TView): void {
        if (this.canActivateView(view)) {
            this._activeView.set(view);
        }
    }

    public canActivateView(view: string): boolean {
        return this._viewTypes.has(view);
    }

    public setFilterValues(values: FilterValues): void {
        this._activeFilters.set(values);
    }

    public buildExportFilters(): ReadonlyArray<ICollectionExportFilter> {
        return Object.entries(this._activeFilters())
            .filter(([, value]) => this.hasFilterValue(value))
            .map(([key, value]) => ({
                key,
                operator: 'contains',
                value: String(value),
            }));
    }

    private hasFilterValue(value: unknown): boolean {
        return value !== undefined && value !== null && value !== '';
    }

    private getTableViewConfig(views: ICollectionViewConfig<TItem, TView, TCalendarItem>['views']): ICollectionTableViewConfig<TItem, TView> | undefined {
        return views.find((view): view is ICollectionTableViewConfig<TItem, TView> => view.viewKind === CollectionViewKind.Table);
    }

    private getGalleryViewConfig(views: ICollectionViewConfig<TItem, TView, TCalendarItem>['views']): ICollectionGalleryViewConfig<TItem, TView> | undefined {
        return views.find((view): view is ICollectionGalleryViewConfig<TItem, TView> => view.viewKind === CollectionViewKind.Gallery);
    }

    private getFlowViewConfig(views: ICollectionViewConfig<TItem, TView, TCalendarItem>['views']): ICollectionFlowViewConfig<TItem, TView> | undefined {
        return views.find((view): view is ICollectionFlowViewConfig<TItem, TView> => view.viewKind === CollectionViewKind.Flow);
    }

    private getCalendarViewConfig(
        views: ICollectionViewConfig<TItem, TView, TCalendarItem>['views'],
    ): ICollectionCalendarViewConfig<TCalendarItem, TView> | undefined {
        return views.find((view): view is ICollectionCalendarViewConfig<TCalendarItem, TView> => view.viewKind === CollectionViewKind.Calendar);
    }

    private createTableView(
        fields: ReadonlyArray<ICollectionField<TItem>>,
        tableConfig?: ICollectionTableViewConfig<TItem, TView>,
    ): ICollectionTableView<TItem> | undefined {
        if (!tableConfig) {
            return undefined;
        }

        const columns = [
            ...fields.filter((field) => field.table !== false).map((field) => this.buildColumnDefinition(field)),
            ...(tableConfig.additionalColumns ?? []),
        ];

        return {
            columnDefinitions: signal(columns).asReadonly(),
            templateColumnDefinitions: signal(this.buildTemplateColumnDefinitions(columns)).asReadonly(),
        };
    }

    private createGalleryView(galleryConfig?: ICollectionGalleryViewConfig<TItem, TView>): ICollectionGalleryView<TItem> | undefined {
        if (!galleryConfig) {
            return undefined;
        }

        return {
            primaryText: galleryConfig.primaryText,
            secondaryText: galleryConfig.secondaryText,
            metaText: galleryConfig.metaText,
            itemIconName: galleryConfig.itemIconName,
            viewIconName: galleryConfig.iconName,
        };
    }

    private createFlowView(flowConfig?: ICollectionFlowViewConfig<TItem, TView>): ICollectionFlowView<TItem> | undefined {
        if (!flowConfig) {
            return undefined;
        }

        const columnExpansionPreference = createFlowColumnExpansionPreference(
            flowConfig.columnExpansionStorageKey,
            flowConfig.columns.map((column) => column.key),
        );

        return {
            itemKey: flowConfig.itemKey,
            columnKey: flowConfig.columnKey,
            columns: flowConfig.columns,
            itemTitle: flowConfig.itemTitle,
            itemSubtitle: flowConfig.itemSubtitle,
            viewIconName: flowConfig.iconName,
            isColumnExpanded: columnExpansionPreference.isColumnExpanded,
            onColumnExpansionChanged: columnExpansionPreference.onColumnExpansionChanged,
        };
    }

    private createCalendarView(calendarConfig?: ICollectionCalendarViewConfig<TCalendarItem, TView>): ICollectionCalendarView<TCalendarItem> | undefined {
        if (!calendarConfig) {
            return undefined;
        }

        return {
            eventKey: calendarConfig.eventKey,
            eventStart: calendarConfig.eventStart,
            eventEnd: calendarConfig.eventEnd,
            eventTitle: calendarConfig.eventTitle,
            eventContent: calendarConfig.eventContent,
            eventVariant: calendarConfig.eventVariant,
            eventStatus: calendarConfig.eventStatus,
            eventAllDay: calendarConfig.eventAllDay,
            schedulerView: calendarConfig.schedulerView,
            hourStart: calendarConfig.hourStart,
            hourEnd: calendarConfig.hourEnd,
            stepMinutes: calendarConfig.stepMinutes,
            firstDayOfWeek: calendarConfig.firstDayOfWeek,
            isTodayHighlighted: calendarConfig.isTodayHighlighted,
            isWeekendHighlighted: calendarConfig.isWeekendHighlighted,
            viewIconName: calendarConfig.iconName,
        };
    }

    private buildTemplateColumnDefinitions(columns: Array<IDataTableColumnDefinition<TItem>>): Array<IDataTableColumnDefinition<unknown>> {
        return columns.map((column) => this.buildTemplateColumnDefinition(column));
    }

    private buildTemplateColumnDefinition(column: IDataTableColumnDefinition<TItem>): IDataTableColumnDefinition<unknown> {
        const pathFn = column.pathFn;
        const cellTemplate = column.cellTemplate;
        const headerCellTemplate = column.headerCellTemplate;
        const sortFn = column.sortFn;

        return {
            ...column,
            pathFn: typeof pathFn === 'function' ? (item) => pathFn(item as TItem) : pathFn,
            cellTemplate: cellTemplate ? (item, _templateColumn, resolvedValue) => cellTemplate(item as TItem, column, resolvedValue) : undefined,
            headerCellTemplate: headerCellTemplate ? (templateColumn) => headerCellTemplate(templateColumn as TItem) : undefined,
            sortFn: sortFn ? (a, b, dir) => sortFn(a as TItem, b as TItem, dir) : undefined,
        };
    }

    private buildColumnDefinition(field: ICollectionField<TItem>): IDataTableColumnDefinition<TItem> {
        const table = field.table === false ? undefined : field.table;

        return {
            key: field.key,
            title: field.title,
            pathFn: table?.pathFn ?? field.pathFn ?? field.key,
            sortFn: table?.sortFn ?? field.sortFn,
            ...table,
        };
    }

    private buildFilterDefinitions(fields: ReadonlyArray<ICollectionField<TItem>>): ReadonlyArray<IFilterDefinition> {
        const definitions: IFilterDefinition[] = [];

        for (const field of fields) {
            if (!field.filter) {
                continue;
            }

            definitions.push({
                key: field.key,
                label: field.title,
                type: field.filter.type,
                placeholder: field.filter.placeholder,
                options: field.filter.options,
            });
        }

        return definitions;
    }

    private buildExportColumns(fields: ReadonlyArray<ICollectionField<TItem>>): ReadonlyArray<ICollectionExportColumn> {
        return fields
            .filter((field) => field.export !== false && field.export?.enabled !== false)
            .map((field) => ({
                key: field.key,
                header: field.title,
                type: field.export === false ? undefined : (field.export?.type ?? this.inferExportType(field.filter?.type)),
                autoWidth: field.export === false ? undefined : field.export?.autoWidth,
                width: field.export === false ? undefined : field.export?.width,
                numFmt: field.export === false ? undefined : field.export?.numFmt,
            }));
    }

    private inferExportType(filterType?: FilterTypeValue): ICollectionExportColumn['type'] {
        switch (filterType) {
            case 'number':
                return 'number';
            case 'date':
            case 'date-range':
                return 'date';
            case 'boolean':
                return 'boolean';
            default:
                return 'string';
        }
    }

    // #endregion
}
