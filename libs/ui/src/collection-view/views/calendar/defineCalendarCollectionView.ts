// #region Imports

import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionCalendarViewConfig } from './ICollectionCalendarViewConfig';

// #endregion

/**
 * Defines a calendar collection view with full type inference.
 *
 * @param config - The calendar view configuration.
 * @returns The calendar view configuration.
 *
 * @public
 */
export function defineCalendarCollectionView<TItem, TView extends string>(
    config: Omit<ICollectionCalendarViewConfig<TItem, TView>, 'viewKind'>,
): ICollectionCalendarViewConfig<TItem, TView> {
    return {
        ...config,
        viewKind: CollectionViewKind.Calendar,
    };
}
