// #region Imports

import type { ICollectionGalleryViewConfig } from './ICollectionGalleryViewConfig';

// #endregion

/**
 * Runtime gallery projection for a collection view.
 *
 * @public
 */
export interface ICollectionGalleryView<TItem> extends Omit<ICollectionGalleryViewConfig<TItem, string>, 'type' | 'label' | 'iconName' | 'viewKind'> {
    /**
     * Optional icon name used by feature-specific view toggles.
     */
    readonly viewIconName?: string;
}
