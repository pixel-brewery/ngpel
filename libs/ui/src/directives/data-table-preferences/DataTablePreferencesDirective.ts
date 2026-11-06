// #region Imports

import { afterNextRender, booleanAttribute, DestroyRef, Directive, HostListener, inject, input } from '@angular/core';
import { DataTableComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { IDataTableColumnDefinition, TableColumnResizedEvent, TableElement, TableHeaderCellElement } from '@pixel-brewery/mosaik-elements-foundation';
import { JsonUserPreferenceCodec, USER_PREFERENCE_STORAGE, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import type { IDataTablePreferenceState } from './IDataTablePreferenceState';

// #endregion

// #region Constants

const DATA_TABLE_PREFERENCE_VERSION = 1;

const DATA_TABLE_PREFERENCE_CODEC = new JsonUserPreferenceCodec<IDataTablePreferenceState>(isDataTablePreferenceState);

// #endregion

/**
 * Persists column visibility and user-selected widths for a Mosaik data-table.
 *
 * @public
 */
@Directive({
    selector: 'mosaik-data-table[ngpDataTablePreferences]',
    standalone: true,
})
export class DataTablePreferencesDirective {
    // #region Fields

    private readonly _dataTable: DataTableComponent = inject(DataTableComponent, { host: true });
    private readonly _storage: IUserPreferenceStorage = inject(USER_PREFERENCE_STORAGE);
    private readonly _destroyRef = inject(DestroyRef);

    /**
     * Stable preference key used to store the table configuration.
     *
     * @public
     * @readonly
     */
    public readonly preferenceKey = input.required<string>({
        alias: 'ngpDataTablePreferences',
    });

    /** Whether to persist column widths alongside visibility. */
    public readonly persistColumnWidths = input(true, { alias: 'ngpDataTablePersistColumnWidths', transform: booleanAttribute });

    // #endregion

    // #region Ctor

    /**
     * Creates a data-table preference directive.
     *
     * @public
     */
    public constructor() {
        afterNextRender(() => this.restorePreferences());
    }

    // #endregion

    // #region Methods

    /**
     * Captures Mosaik column editor changes after the editor closes.
     *
     * @public
     */
    @HostListener('dataTableEditorClosed')
    public onDataTableEditorClosed(): void {
        this.persistPreferences();
        if (this.persistColumnWidths()) {
            void this.restoreColumnWidths();
        }
    }

    /** Persists the resized width under the column's stable key. */
    @HostListener('tableColumnResized', ['$event'])
    public onTableColumnResized(event: TableColumnResizedEvent): void {
        if (!this.persistColumnWidths() || typeof event.detail?.width !== 'number') {
            return;
        }
        const width = Math.round(event.detail.width);
        if (!isColumnWidth(width)) {
            return;
        }

        const [origin] = event.composedPath();
        const header = origin instanceof HTMLElement && origin.localName === 'mosaik-table-header-cell' ? (origin as TableHeaderCellElement) : undefined;
        if (header && header.closest('mosaik-table') !== this.resolveTable()) {
            return;
        }
        const key = header?.key || this.resolveVisibleColumnKeys()[event.detail.columnIndex];
        if (key) {
            this.persistPreferences({ key, width });
        }
    }

    private restorePreferences(): void {
        const state = this._storage.read(this.preferenceKey(), DATA_TABLE_PREFERENCE_CODEC);

        if (!state) {
            return;
        }

        const columns = this.resolveColumns();
        const preferencesByKey = new Map(state.columns.map(({ key, hidden }) => [key, hidden]));
        const nextColumns = columns.map((column) => {
            const hidden = preferencesByKey.get(column.key);
            return canPersistVisibility(column) && hidden !== undefined && hidden !== column.hidden ? { ...column, hidden } : column;
        });

        if (nextColumns.some((column, index) => column !== columns[index])) {
            this._dataTable.setInput('columnDefinitions', nextColumns);
        }
        if (this.persistColumnWidths()) {
            void this.restoreColumnWidths();
        }
    }

    private async restoreColumnWidths(): Promise<void> {
        const key = this.preferenceKey();
        const element = this._dataTable.elementRef.nativeElement;
        await element.updateComplete;
        if (this._destroyRef.destroyed || key !== this.preferenceKey() || !this.persistColumnWidths()) {
            return;
        }

        // Read current definitions and preferences after Mosaik renders the column changes.
        const state = this._storage.read(key, DATA_TABLE_PREFERENCE_CODEC);
        const widthsByKey = new Map(state?.columns.map(({ key, width }) => [key, width]));
        const widths = this.resolveVisibleColumnKeys().map((columnKey) => widthsByKey.get(columnKey));
        const table = this.resolveTable();
        if (table && widths.some((width) => width !== undefined)) {
            // The native setter emits columnsChanged, which updates the data-table's width map.
            table.columns = widths.map((width) => (width === undefined ? '1fr' : `${width}px`)).join(' ');
        }
    }

    private persistPreferences(resized?: Readonly<{ key: string; width: number }>): void {
        const key = this.preferenceKey();
        const previous = this.persistColumnWidths() ? this._storage.read(key, DATA_TABLE_PREFERENCE_CODEC) : undefined;
        if (this._dataTable.elementRef.nativeElement.autoGenerateColumns) {
            if (resized) {
                const columns = new Map(previous?.columns.map((column) => [column.key, column]));
                columns.set(resized.key, { ...resized, hidden: columns.get(resized.key)?.hidden ?? false });
                this._storage.write(key, { version: DATA_TABLE_PREFERENCE_VERSION, columns: [...columns.values()] }, DATA_TABLE_PREFERENCE_CODEC);
            }
            return;
        }

        const widthsByKey = new Map(previous?.columns.map(({ key, width }) => [key, width]));
        if (resized) {
            widthsByKey.set(resized.key, resized.width);
        }
        const columns = this.resolveColumns().flatMap((column) => {
            const width = widthsByKey.get(column.key);
            if (width === undefined && !canPersistVisibility(column)) {
                return [];
            }
            return [{ key: column.key, hidden: column.hidden === true, ...(width === undefined ? {} : { width }) }];
        });

        this._storage.write(key, { version: DATA_TABLE_PREFERENCE_VERSION, columns }, DATA_TABLE_PREFERENCE_CODEC);
    }

    private resolveVisibleColumnKeys(): ReadonlyArray<string> {
        // Auto-generated columns exist as header metadata before Mosaik materializes explicit definitions.
        const columns = this._dataTable.elementRef.nativeElement.autoGenerateColumns ? (this.resolveTable()?.getColumnMetadata() ?? []) : this.resolveColumns();
        return columns.filter(({ key, hidden }) => key !== '' && hidden !== true).map(({ key }) => key);
    }

    private resolveColumns(): Array<IDataTableColumnDefinition> {
        return [...(this._dataTable.elementRef.nativeElement.columnDefinitions ?? [])];
    }

    private resolveTable(): TableElement | null | undefined {
        return this._dataTable.elementRef.nativeElement.shadowRoot?.querySelector<TableElement>('mosaik-table[part~="table"]');
    }

    // #endregion
}

function isDataTablePreferenceState(value: unknown): value is IDataTablePreferenceState {
    if (!isRecord(value) || value['version'] !== DATA_TABLE_PREFERENCE_VERSION || !Array.isArray(value['columns'])) {
        return false;
    }

    return value['columns'].every(isDataTableColumnPreference);
}

function isDataTableColumnPreference(value: unknown): boolean {
    return (
        isRecord(value) &&
        typeof value['key'] === 'string' &&
        typeof value['hidden'] === 'boolean' &&
        (value['width'] === undefined || isColumnWidth(value['width']))
    );
}

function isColumnWidth(value: unknown): value is number {
    return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}

function canPersistVisibility(column: IDataTableColumnDefinition): boolean {
    return column.columnChoosable !== false && column.hideable !== false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}
