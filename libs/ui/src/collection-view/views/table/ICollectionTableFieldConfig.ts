// #region Imports

import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';

// #endregion

/**
 * Data-table behavior for a collection field.
 *
 * @public
 */
export type ICollectionTableFieldConfig<TItem> = Partial<Omit<IDataTableColumnDefinition<TItem>, 'key' | 'title'>>;
