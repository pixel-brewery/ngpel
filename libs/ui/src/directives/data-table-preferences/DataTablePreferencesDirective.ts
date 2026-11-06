// #region Imports

import { afterNextRender, Directive, HostListener, inject, input } from '@angular/core';
import { DataTableComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import { JsonUserPreferenceCodec, USER_PREFERENCE_STORAGE, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import type { IDataTablePreferenceState } from './IDataTablePreferenceState';

// #endregion

// #region Constants

const DATA_TABLE_PREFERENCE_VERSION = 1;

const DATA_TABLE_PREFERENCE_CODEC = new JsonUserPreferenceCodec<IDataTablePreferenceState>(isDataTablePreferenceState);

// #endregion

/**
 * Persists user-visible column configuration for a Mosaik data-table.
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

    /**
     * Stable preference key used to store the table configuration.
     *
     * @public
     * @readonly
     */
    public readonly preferenceKey = input.required<string>({
        alias: 'ngpDataTablePreferences',
    });

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
    }

    private restorePreferences(): void {
        const state = this._storage.read(this.preferenceKey(), DATA_TABLE_PREFERENCE_CODEC);

        if (!state) {
            return;
        }

        const columns = this.resolveColumns();
        const preferencesByKey = new Map(state.columns.map((column) => [column.key, column.hidden]));
        const nextColumns = columns.map((column) => ({
            ...column,
            hidden: preferencesByKey.get(column.key) ?? column.hidden,
        }));

        this._dataTable.setInput('columnDefinitions', nextColumns);
    }

    private persistPreferences(): void {
        const columns = this.resolveColumns();

        this._storage.write(
            this.preferenceKey(),
            {
                version: DATA_TABLE_PREFERENCE_VERSION,
                columns: columns
                    .filter((column) => column.columnChoosable !== false && column.hideable !== false)
                    .map((column) => ({
                        key: column.key,
                        hidden: column.hidden === true,
                    })),
            },
            DATA_TABLE_PREFERENCE_CODEC,
        );
    }

    private resolveColumns(): Array<IDataTableColumnDefinition> {
        return [...(this._dataTable.elementRef.nativeElement.columnDefinitions ?? [])];
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
    return isRecord(value) && typeof value['key'] === 'string' && typeof value['hidden'] === 'boolean';
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}
