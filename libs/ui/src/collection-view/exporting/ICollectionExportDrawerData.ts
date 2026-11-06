// #region Imports

import type { ICollectionExportColumn } from './ICollectionExportColumn';

// #endregion

/**
 * Supported export document formats.
 *
 * @public
 */
export type CollectionExportFormat = 'xlsx' | 'csv' | 'ods';

/**
 * Input data for the collection export dialog.
 *
 * @public
 */
export interface ICollectionExportDrawerData {
    /**
     * All exportable columns with their metadata.
     */
    readonly columns: ReadonlyArray<ICollectionExportColumn>;

    /** Number of records that match the current filter, when known. */
    readonly recordCount?: number;

    /**
     * Available export formats.
     *
     * @default ['xlsx', 'csv', 'ods']
     */
    readonly availableFormats?: ReadonlyArray<CollectionExportFormat>;

    /**
     * The default format to select.
     *
     * @default 'xlsx'
     */
    readonly defaultFormat?: CollectionExportFormat;
}
