// #region Imports

import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionGalleryViewConfig } from './ICollectionGalleryViewConfig';

// #endregion

/**
 * Defines a gallery collection view with full type inference.
 *
 * @param config - The gallery view configuration.
 * @returns The gallery view configuration.
 *
 * @public
 */
export function defineGalleryCollectionView<TItem, TView extends string>(
    config: Omit<ICollectionGalleryViewConfig<TItem, TView>, 'viewKind'>,
): ICollectionGalleryViewConfig<TItem, TView> {
    return {
        ...config,
        viewKind: CollectionViewKind.Gallery,
    };
}
