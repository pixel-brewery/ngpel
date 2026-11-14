// #region Imports

import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import type { FilterTypeValue } from '../../components/filter-bar/IFilterDefinition';
import type { IFilterOption } from '../../components/filter-bar/IFilterDefinition';
import type { ICollectionExportFieldConfig } from '../exporting/ICollectionExportFieldConfig';
import type { ICollectionTableFieldConfig } from '../views/table/ICollectionTableFieldConfig';

// #endregion

/**
 * Field metadata used as the source for table columns, filters, and exports.
 *
 * @public
 */
export interface ICollectionField<TItem> {
    /**
     * Stable field key.
     */
    readonly key: keyof TItem & string;

    /**
     * Display title used for column headers, filters, and exports.
     */
    readonly title: string;

    /**
     * Optional member path or value getter used by table projections.
     */
    readonly pathFn?: IDataTableColumnDefinition<TItem>['pathFn'];

    /**
     * Optional sort callback used by table projections.
     */
    readonly sortFn?: IDataTableColumnDefinition<TItem>['sortFn'];

    /**
     * Optional filter projection. Omit to exclude the field from filters.
     */
    readonly filter?: {
        readonly type: FilterTypeValue;
        readonly placeholder?: string;
        /** Static choices or choices read from signals as they become available. */
        readonly options?: ReadonlyArray<IFilterOption> | (() => ReadonlyArray<IFilterOption>);
        /** Restricts numeric input to whole numbers. */
        readonly integer?: boolean;
    };

    /**
     * Optional table projection. Set to false to exclude the field from the table.
     */
    readonly table?: ICollectionTableFieldConfig<TItem> | false;

    /**
     * Optional export projection. Set enabled=false to exclude the field from exports.
     */
    readonly export?: ICollectionExportFieldConfig | false;
}
