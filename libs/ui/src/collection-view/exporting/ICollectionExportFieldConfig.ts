// #region Imports

import type { ICollectionExportColumn } from './ICollectionExportColumn';

// #endregion

/**
 * Export behavior for a collection field.
 *
 * @public
 */
export interface ICollectionExportFieldConfig extends Partial<Omit<ICollectionExportColumn, 'key' | 'header'>> {
    /**
     * Whether this field participates in exports.
     */
    readonly enabled?: boolean;
}
