// #region Imports

import type { Signal } from '@angular/core';
import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';

// #endregion

/**
 * Runtime table projection for a collection view.
 *
 * @public
 */
export interface ICollectionTableView<TItem> {
    /**
     * Data-table column definitions derived from collection fields.
     */
    readonly columnDefinitions: Signal<Array<IDataTableColumnDefinition<TItem>>>;

    /**
     * Data-table column definitions widened for Angular templates.
     */
    readonly templateColumnDefinitions: Signal<Array<IDataTableColumnDefinition<unknown>>>;
}
