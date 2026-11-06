/**
 * Export column metadata derived from a collection field.
 *
 * @public
 */
export interface ICollectionExportColumn {
    /**
     * Field key matching the entity property name.
     */
    readonly key: string;

    /**
     * Translated column header for the export file.
     */
    readonly header: string;

    /**
     * Column data type hint.
     */
    readonly type?: 'string' | 'number' | 'date' | 'boolean';

    /**
     * Auto-size column width based on content.
     */
    readonly autoWidth?: boolean;

    /**
     * Column width in characters.
     */
    readonly width?: number;

    /**
     * Number format string.
     */
    readonly numFmt?: string;
}
