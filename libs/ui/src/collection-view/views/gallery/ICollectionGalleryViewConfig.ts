// #region Imports

import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionViewDefinition } from '../../core/ICollectionViewDefinition';

// #endregion

/**
 * Configuration for the gallery projection of a collection view.
 *
 * @public
 */
export interface ICollectionGalleryViewConfig<TItem, TView extends string> extends ICollectionViewDefinition<TView> {
    /**
     * Discriminator used by the collection-view factory.
     */
    readonly viewKind: typeof CollectionViewKind.Gallery;

    /**
     * Resolves the primary text for a gallery item.
     */
    readonly primaryText: (item: TItem) => string;

    /**
     * Resolves the secondary text for a gallery item.
     */
    readonly secondaryText?: (item: TItem) => string;

    /**
     * Resolves the tertiary/meta text for a gallery item.
     */
    readonly metaText?: (item: TItem) => string;

    /**
     * Optional icon name for gallery items.
     */
    readonly itemIconName?: (item: TItem) => string;
}
