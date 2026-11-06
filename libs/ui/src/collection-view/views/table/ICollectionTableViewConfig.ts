// #region Imports

import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionViewDefinition } from '../../core/ICollectionViewDefinition';

// #endregion

/**
 * Configuration for the table projection of a collection view.
 *
 * @public
 */
export interface ICollectionTableViewConfig<TItem, TView extends string> extends ICollectionViewDefinition<TView> {
    /**
     * Discriminator used by the collection-view factory.
     */
    readonly viewKind: typeof CollectionViewKind.Table;

    /**
     * Additional table-only columns, such as actions.
     */
    readonly additionalColumns?: ReadonlyArray<IDataTableColumnDefinition<TItem>>;
}
