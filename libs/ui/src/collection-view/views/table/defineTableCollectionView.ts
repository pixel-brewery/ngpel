// #region Imports

import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionTableViewConfig } from './ICollectionTableViewConfig';

// #endregion

/**
 * Defines a table collection view with full type inference.
 *
 * @param config - The table view configuration.
 * @returns The table view configuration.
 *
 * @public
 */
export function defineTableCollectionView<TItem, TView extends string>(
    config: Omit<ICollectionTableViewConfig<TItem, TView>, 'viewKind'>,
): ICollectionTableViewConfig<TItem, TView> {
    return {
        ...config,
        viewKind: CollectionViewKind.Table,
    };
}
