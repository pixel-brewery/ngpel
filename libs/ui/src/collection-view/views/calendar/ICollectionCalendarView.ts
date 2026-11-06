// #region Imports

import type { ICollectionCalendarViewConfig } from './ICollectionCalendarViewConfig';

// #endregion

/**
 * Runtime calendar projection for a collection view.
 *
 * @public
 */
export interface ICollectionCalendarView<TItem> extends Omit<ICollectionCalendarViewConfig<TItem, string>, 'type' | 'label' | 'iconName' | 'viewKind'> {
    /**
     * Optional icon name used by feature-specific view toggles.
     */
    readonly viewIconName?: string;
}
