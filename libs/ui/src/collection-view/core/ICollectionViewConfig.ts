// #region Imports

import type { ICollectionField } from '../fields/ICollectionField';
import type { ICollectionCalendarViewConfig } from '../views/calendar/ICollectionCalendarViewConfig';
import type { ICollectionFlowViewConfig } from '../views/flow/ICollectionFlowViewConfig';
import type { ICollectionGalleryViewConfig } from '../views/gallery/ICollectionGalleryViewConfig';
import type { ICollectionTableViewConfig } from '../views/table/ICollectionTableViewConfig';

// #endregion

/**
 * Complete collection-view configuration for a feature collection.
 *
 * @public
 */
export interface ICollectionViewConfig<TItem, TView extends string, TCalendarItem = TItem> {
    /**
     * Default view type for the collection.
     */
    readonly defaultView: TView;

    /**
     * Field metadata used by table, filter, and export projections.
     */
    readonly fields: ReadonlyArray<ICollectionField<TItem>>;

    /**
     * Supported view projections for this feature collection.
     */
    readonly views: ReadonlyArray<
        | ICollectionCalendarViewConfig<TCalendarItem, TView>
        | ICollectionTableViewConfig<TItem, TView>
        | ICollectionGalleryViewConfig<TItem, TView>
        | ICollectionFlowViewConfig<TItem, TView>
    >;
}
