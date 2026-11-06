// #region Imports

import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionFlowViewConfig } from './ICollectionFlowViewConfig';

// #endregion

/**
 * Defines a flow collection view with full type inference.
 *
 * @param config - The flow view configuration.
 * @returns The flow view configuration.
 *
 * @public
 */
export function defineFlowCollectionView<TItem, TView extends string, TColumnKey extends string = string>(
    config: Omit<ICollectionFlowViewConfig<TItem, TView, TColumnKey>, 'viewKind'>,
): ICollectionFlowViewConfig<TItem, TView, TColumnKey> {
    return {
        ...config,
        viewKind: CollectionViewKind.Flow,
    };
}
