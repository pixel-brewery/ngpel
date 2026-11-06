// #region Imports

import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionViewDefinition } from '../../core/ICollectionViewDefinition';

// #endregion

/**
 * Configuration for the flow projection of a collection view.
 *
 * @public
 */
export interface ICollectionFlowViewConfig<TItem, TView extends string, TColumnKey extends string = string> extends ICollectionViewDefinition<TView> {
    /**
     * Discriminator used by the collection-view factory.
     */
    readonly viewKind: typeof CollectionViewKind.Flow;

    /**
     * Resolves the stable item key.
     */
    readonly itemKey: (item: TItem) => string;

    /**
     * Resolves the column key for an item.
     */
    readonly columnKey: (item: TItem) => TColumnKey;

    /**
     * Declares all columns that can be shown in the board.
     */
    readonly columns: ReadonlyArray<{ readonly key: TColumnKey; readonly title: string }>;

    /**
     * Local-storage key used to restore collapsed columns for this board.
     */
    readonly columnExpansionStorageKey: string;

    /**
     * Resolves the title shown on a board item.
     */
    readonly itemTitle: (item: TItem) => string;

    /**
     * Resolves the optional subtitle shown on a board item.
     */
    readonly itemSubtitle?: (item: TItem) => string;
}
