// #region Imports

import type { ICollectionExportColumn } from './ICollectionExportColumn';
import type { CollectionExportFormat } from './ICollectionExportDrawerData';

// #endregion

/**
 * Result returned by the collection export drawer on confirmation.
 *
 * @public
 */
export interface ICollectionExportDrawerResult {
    /**
     * The columns selected by the user.
     */
    readonly columns: ReadonlyArray<ICollectionExportColumn>;

    /**
     * The export format chosen by the user.
     */
    readonly format: CollectionExportFormat;
}
