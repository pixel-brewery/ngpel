// #region Imports

import type { ICollectionFlowViewConfig } from './ICollectionFlowViewConfig';

// #endregion

/**
 * Runtime flow projection for a collection view.
 *
 * @public
 */
export interface ICollectionFlowView<TItem, TColumnKey extends string = string> extends Omit<
    ICollectionFlowViewConfig<TItem, string, TColumnKey>,
    'type' | 'label' | 'iconName' | 'viewKind' | 'columnExpansionStorageKey'
> {
    /**
     * Optional icon name used by feature-specific view toggles.
     */
    readonly viewIconName?: string;

    /**
     * Resolves the restored expanded state of one column.
     */
    readonly isColumnExpanded: (columnKey: TColumnKey) => boolean;

    /**
     * Applies and persists a Mosaik column expansion change.
     */
    readonly onColumnExpansionChanged: (change: unknown) => void;
}
