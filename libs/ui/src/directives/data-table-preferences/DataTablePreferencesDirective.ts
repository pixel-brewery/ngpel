// #region Imports

import { afterNextRender, booleanAttribute, DestroyRef, Directive, HostListener, inject, input } from '@angular/core';
import { DataTableComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { IDataTableColumnDefinition, TableColumnResizedEvent, TableHeaderCellElement } from '@pixel-brewery/mosaik-elements-foundation';
import { JsonUserPreferenceCodec, USER_PREFERENCE_STORAGE, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import type { IDataTableColumnPreference } from './IDataTableColumnPreference';
import type { IDataTablePreferenceState } from './IDataTablePreferenceState';

// #endregion

// #region Constants

const DATA_TABLE_PREFERENCE_VERSION = 1;

const DATA_TABLE_PREFERENCE_CODEC = new JsonUserPreferenceCodec<IDataTablePreferenceState>(isDataTablePreferenceState);

// #endregion

type ColumnIdentity = Pick<IDataTableColumnPreference, 'key' | 'hidden'>;
type ColumnDefinition = IDataTableColumnDefinition & { groupable?: boolean };

interface IPreferenceTable extends HTMLElement {
    // CSS track lists are used by older Mosaik releases. New releases address widths by column key.
    columns?: string;
    getColumnMetadata?(): ReadonlyArray<ColumnIdentity>;
    getVisualColumns?(): ReadonlyArray<ColumnIdentity>;
    setColumnWidth?(key: string, width: string): boolean;
}

interface INativeTableLayout {
    readonly columns?: ReadonlyArray<{
        readonly key: string;
        readonly hidden?: boolean;
        readonly pinned?: IDataTableColumnPreference['pinned'];
    }>;
    readonly groupBy?: ReadonlyArray<string>;
}

/**
 * Persists column visibility and widths for a Mosaik data-table, with optional grouping and column pinning.
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
    private _restoringWidths = false;

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

    /** Whether to persist native grouping and column pinning for explicitly defined columns. */
    public readonly persistLayout = input(false, { alias: 'ngpDataTablePersistLayout', transform: booleanAttribute });

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

    /** Handles the composed column editor event of current Mosaik releases. */
    @HostListener('tableColumnEditorClosed', ['$event'])
    public onTableColumnEditorClosed(event: Event): void {
        const table = this.resolveTable();
        if (table && event.composedPath()[0] === table) {
            this.onDataTableEditorClosed();
        }
    }

    /** Stores only the preference fields from the native table state. */
    @HostListener('dataTableStateChanged', ['$event'])
    public onDataTableStateChanged(event: Event | { readonly state: INativeTableLayout }): void {
        if (this._restoringWidths) {
            return;
        }
        // The Angular wrapper forwards the event detail directly; plain DOM listeners receive a CustomEvent.
        if ('composedPath' in event && event.composedPath()[0] !== this._dataTable.elementRef.nativeElement) {
            return;
        }
        const state =
            'state' in event ? event.state : event instanceof CustomEvent ? (event.detail as { readonly state?: INativeTableLayout })?.state : undefined;
        if (state) {
            this.persistPreferences(undefined, state);
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
        const preferencesByKey = new Map(state.columns.map((column) => [column.key, column]));
        const nextColumns = columns.map((column) => {
            const preference = preferencesByKey.get(column.key);
            const hidden = canPersistVisibility(column) ? preference?.hidden : undefined;
            const pinned = this.persistLayout() && column.pinable !== false ? preference?.pinned : undefined;

            return (hidden !== undefined && hidden !== column.hidden) || (pinned !== undefined && pinned !== column.pinned)
                ? { ...column, ...(hidden === undefined ? {} : { hidden }), ...(pinned === undefined ? {} : { pinned }) }
                : column;
        });

        if (nextColumns.some((column, index) => column !== columns[index])) {
            this._dataTable.setInput('columnDefinitions', nextColumns);
        }
        const element = this._dataTable.elementRef.nativeElement;
        if (this.persistLayout() && state.groupBy && 'groupBy' in element && Array.isArray(element.groupBy)) {
            const groupingEnabled = 'groupable' in element && element.groupable === true;
            element.groupBy = state.groupBy.filter((key) => columns.some((column) => column.key === key && (column.groupable ?? groupingEnabled)));
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
        const table = this.resolveTable();
        if (table?.setColumnWidth) {
            this._restoringWidths = true;
            try {
                for (const [columnKey, width] of widthsByKey) {
                    if (width !== undefined) table.setColumnWidth(columnKey, `${width}px`);
                }
            } finally {
                this._restoringWidths = false;
            }
        } else if (table) {
            const widths = this.resolveVisibleColumnKeys().map((columnKey) => widthsByKey.get(columnKey));
            if (widths.some((width) => width !== undefined)) {
                table.columns = widths.map((width) => (width === undefined ? '1fr' : `${width}px`)).join(' ');
            }
        }
    }

    private persistPreferences(resized?: Readonly<{ key: string; width: number }>, layout?: INativeTableLayout): void {
        const key = this.preferenceKey();
        const previous = this._storage.read(key, DATA_TABLE_PREFERENCE_CODEC);
        if (this._dataTable.elementRef.nativeElement.autoGenerateColumns) {
            if (resized) {
                const columns = new Map(previous?.columns.map((column) => [column.key, column]));
                const previousColumn = columns.get(resized.key);
                columns.set(resized.key, { hidden: false, ...previousColumn, ...resized });
                this.writePreferences(key, previous, [...columns.values()], previous?.groupBy);
            }
            return;
        }

        const previousByKey = new Map(previous?.columns.map((column) => [column.key, column]));
        const nativeColumnsByKey = new Map(layout?.columns?.map((column) => [column.key, column]));
        const persistLayout = this.persistLayout();
        const columns = this.resolveColumns().flatMap((column) => {
            const preference = previousByKey.get(column.key);
            const nativeColumn = nativeColumnsByKey.get(column.key);
            const width = this.persistColumnWidths() ? (resized?.key === column.key ? resized.width : preference?.width) : undefined;
            const pinned = (persistLayout && column.pinable !== false ? nativeColumn?.pinned : undefined) ?? preference?.pinned;
            const persistVisibility = canPersistVisibility(column);
            if (width === undefined && pinned === undefined && !persistVisibility) {
                return [];
            }
            const hidden = (persistVisibility ? nativeColumn?.hidden : undefined) ?? column.hidden === true;
            return [{ key: column.key, hidden, ...(width === undefined ? {} : { width }), ...(pinned === undefined ? {} : { pinned }) }];
        });

        this.writePreferences(key, previous, columns, (persistLayout ? layout?.groupBy : undefined) ?? previous?.groupBy);
    }

    private writePreferences(
        key: string,
        previous: IDataTablePreferenceState | undefined,
        columns: ReadonlyArray<IDataTableColumnPreference>,
        groupBy: ReadonlyArray<string> | undefined,
    ): void {
        const next = { version: DATA_TABLE_PREFERENCE_VERSION, columns, ...(groupBy === undefined ? {} : { groupBy }) };
        if (JSON.stringify(previous) !== JSON.stringify(next)) {
            this._storage.write(key, next, DATA_TABLE_PREFERENCE_CODEC);
        }
    }

    private resolveVisibleColumnKeys(): ReadonlyArray<string> {
        // Auto-generated columns exist as header metadata before Mosaik materializes explicit definitions.
        const table = this.resolveTable();
        const columns =
            table?.getVisualColumns?.() ??
            (this._dataTable.elementRef.nativeElement.autoGenerateColumns ? (table?.getColumnMetadata?.() ?? []) : this.resolveColumns());
        return columns.filter(({ key, hidden }) => key !== '' && hidden !== true).map(({ key }) => key);
    }

    private resolveColumns(): Array<ColumnDefinition> {
        return [...(this._dataTable.elementRef.nativeElement.columnDefinitions ?? [])];
    }

    private resolveTable(): IPreferenceTable | null | undefined {
        return this._dataTable.elementRef.nativeElement.shadowRoot?.querySelector<IPreferenceTable>('mosaik-table[part~="table"]');
    }

    // #endregion
}

function isDataTablePreferenceState(value: unknown): value is IDataTablePreferenceState {
    if (!isRecord(value) || value['version'] !== DATA_TABLE_PREFERENCE_VERSION || !Array.isArray(value['columns'])) {
        return false;
    }

    const groupBy = value['groupBy'];
    return (
        value['columns'].every(isDataTableColumnPreference) &&
        (groupBy === undefined || (Array.isArray(groupBy) && groupBy.every((key) => typeof key === 'string')))
    );
}

function isDataTableColumnPreference(value: unknown): boolean {
    return (
        isRecord(value) &&
        typeof value['key'] === 'string' &&
        typeof value['hidden'] === 'boolean' &&
        (value['width'] === undefined || isColumnWidth(value['width'])) &&
        (value['pinned'] === undefined || value['pinned'] === 'left' || value['pinned'] === 'right' || value['pinned'] === 'none')
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
