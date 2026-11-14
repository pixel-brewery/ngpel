// #region Imports

import { Provider } from '@angular/core';
import { Subject } from 'rxjs';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';
import type { CollectionExportFormat } from './ICollectionExportDrawerData';

// #endregion

/**
 * Internationalization labels for the collection export dialog component.
 *
 * @public
 */
export class CollectionExportDrawerComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _titleLabel: string;
    private _columnsTitleLabel: string;
    private _columnsSelectedLabel: string;
    private _selectAllLabel: string;
    private _deselectAllLabel: string;
    private _formatTitleLabel: string;
    private _xlsxFormatLabel: string;
    private _csvFormatLabel: string;
    private _odsFormatLabel: string;
    private _cancelLabel: string;
    private _exportLabel: string;
    private _columnsRequiredMessage: string;
    private _recordsLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link CollectionExportDrawerComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._titleLabel = 'Export';
        this._columnsTitleLabel = 'Columns';
        this._columnsSelectedLabel = 'columns selected';
        this._selectAllLabel = 'Select all';
        this._deselectAllLabel = 'Deselect all';
        this._formatTitleLabel = 'Format';
        this._xlsxFormatLabel = 'Excel (.xlsx)';
        this._csvFormatLabel = 'CSV (.csv)';
        this._odsFormatLabel = 'OpenDocument (.ods)';
        this._cancelLabel = 'Cancel';
        this._exportLabel = 'Export';
        this._columnsRequiredMessage = 'Select at least one column before exporting.';
        this._recordsLabel = 'records will be exported';
    }

    // #endregion

    // #region Properties

    /**
     * Emits when any label changes.
     *
     * @public
     * @readonly
     */
    public get changes(): Subject<void> {
        return this._changes;
    }

    /**
     * Title of the export dialog.
     *
     * @public
     */
    public get titleLabel(): string {
        return this._titleLabel;
    }

    /**
     * Heading above the column selection section.
     *
     * @public
     */
    public get columnsTitleLabel(): string {
        return this._columnsTitleLabel;
    }

    /**
     * Suffix shown after the column count (e.g. "3 / 5 columns selected").
     *
     * @public
     */
    public get columnsSelectedLabel(): string {
        return this._columnsSelectedLabel;
    }

    /**
     * Label for the "select all" button.
     *
     * @public
     */
    public get selectAllLabel(): string {
        return this._selectAllLabel;
    }

    /**
     * Label for the "deselect all" button.
     *
     * @public
     */
    public get deselectAllLabel(): string {
        return this._deselectAllLabel;
    }

    /**
     * Heading above the format selection section.
     *
     * @public
     */
    public get formatTitleLabel(): string {
        return this._formatTitleLabel;
    }

    /**
     * Label for the Excel export format.
     *
     * @public
     */
    public get xlsxFormatLabel(): string {
        return this._xlsxFormatLabel;
    }

    /**
     * Label for the CSV export format.
     *
     * @public
     */
    public get csvFormatLabel(): string {
        return this._csvFormatLabel;
    }

    /**
     * Label for the OpenDocument export format.
     *
     * @public
     */
    public get odsFormatLabel(): string {
        return this._odsFormatLabel;
    }

    /**
     * Label for the cancel button.
     *
     * @public
     */
    public get cancelLabel(): string {
        return this._cancelLabel;
    }

    /**
     * Label for the export / confirm button.
     *
     * @public
     */
    public get exportLabel(): string {
        return this._exportLabel;
    }

    /**
     * Validation message shown when no export column is selected.
     *
     * @public
     */
    public get columnsRequiredMessage(): string {
        return this._columnsRequiredMessage;
    }

    /** Label shown after the number of records to export. */
    public get recordsLabel(): string {
        return this._recordsLabel;
    }

    public set recordsLabel(value: string) {
        this._recordsLabel = value;
        this._changes.next();
    }

    // #endregion

    // #region Methods

    /**
     * Resolves the display label for an export format.
     *
     * @param format - Export format value.
     * @returns The translated display label.
     * @public
     */
    public getFormatLabel(format: CollectionExportFormat): string {
        switch (format) {
            case 'xlsx':
                return this.xlsxFormatLabel;
            case 'csv':
                return this.csvFormatLabel;
            case 'ods':
                return this.odsFormatLabel;
        }
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the collection export drawer component.
 *
 * @param translations - Translation keys used for the collection export drawer labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideCollectionExportDrawerComponentIntl(translations: IntlTranslationMap<CollectionExportDrawerComponentIntl>): Provider {
    return {
        provide: CollectionExportDrawerComponentIntl,
        useFactory: (): CollectionExportDrawerComponentIntl => translateIntl(new CollectionExportDrawerComponentIntl(), translations),
    };
}
