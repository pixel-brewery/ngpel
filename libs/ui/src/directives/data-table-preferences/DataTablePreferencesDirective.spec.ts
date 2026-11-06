import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataTableComponent } from '@pixel-brewery/mosaik-elements-angular';
import type { IDataTableColumnDefinition } from '@pixel-brewery/mosaik-elements-foundation';
import { USER_PREFERENCE_STORAGE, WebStorageUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DataTablePreferencesDirective } from './DataTablePreferencesDirective';
import type { IDataTablePreferenceState } from './IDataTablePreferenceState';

interface ITestDataTableElement extends HTMLElement {
    columnDefinitions: Array<IDataTableColumnDefinition>;
    updateComplete: Promise<boolean>;
}

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    class DataTableStub {
        public readonly elementRef = angular.inject<import('@angular/core').ElementRef<ITestDataTableElement>>(angular.ElementRef);

        public setInput(key: 'columnDefinitions', value: Array<IDataTableColumnDefinition>): void {
            this.elementRef.nativeElement[key] = value;
        }
    }

    angular.Component({ selector: 'mosaik-data-table', template: '' })(DataTableStub);
    return { DataTableComponent: DataTableStub };
});

const PREFERENCE_KEY = 'ngp-test-data-table-columns';
const browserStorageEntries = new Map<string, string>();
const browserStorage: Storage = {
    get length() {
        return browserStorageEntries.size;
    },
    clear: () => browserStorageEntries.clear(),
    getItem: (key) => browserStorageEntries.get(key) ?? null,
    key: (index) => [...browserStorageEntries.keys()][index] ?? null,
    removeItem: (key) => {
        browserStorageEntries.delete(key);
    },
    setItem: (key, value) => {
        browserStorageEntries.set(key, value);
    },
};

@Component({
    imports: [DataTableComponent, DataTablePreferencesDirective],
    template: '<mosaik-data-table ngpDataTablePreferences />',
})
class TableHostComponent {}

describe('DataTablePreferencesDirective', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        browserStorage.clear();
    });

    it('reads version 1 visibility-only preferences', async () => {
        // Arrange
        storeColumns([{ key: 'team', hidden: true }]);
        const { fixture, host, table } = createTable([{ key: 'name' }, { key: 'team' }]);

        // Act
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(host.columnDefinitions).toEqual([{ key: 'name' }, { key: 'team', hidden: true }]);
        expect(table.columns).toBe('');
    });

    it('restores widths by key after columns are reordered, hidden or added', async () => {
        // Arrange
        storeColumns([
            { key: 'name', hidden: false, width: 235 },
            { key: 'team', hidden: true, width: 100 },
            { key: 'email', hidden: false, width: 305 },
        ]);
        const { fixture, table } = createTable([{ key: 'email' }, { key: 'team' }, { key: 'name' }, { key: 'new' }]);

        // Act
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(table.columns).toBe('305px 235px 1fr');
    });

    it('persists the composed resize event under the originating header key', async () => {
        // Arrange
        storeColumns([{ key: 'team', hidden: true, width: 100 }]);
        const { fixture, table } = createTable([{ key: 'email' }, { key: 'name', hideable: false }, { key: 'team' }]);
        fixture.detectChanges();
        await fixture.whenStable();
        const header = document.createElement('mosaik-table-header-cell');
        Object.assign(header, { key: 'name' });
        table.append(header);

        // Act
        header.dispatchEvent(new CustomEvent('tableColumnResized', { bubbles: true, composed: true, detail: { columnIndex: 0, width: 220.6 } }));

        // Assert
        expect(storedColumns()).toEqual([
            { key: 'email', hidden: false },
            { key: 'name', hidden: false, width: 221 },
            { key: 'team', hidden: true, width: 100 },
        ]);
    });

    it('applies the latest width and visibility after the column editor renders', async () => {
        // Arrange
        storeColumns([{ key: 'team', hidden: true, width: 100 }]);
        const { fixture, host, table } = createTable([{ key: 'name' }, { key: 'team' }]);
        fixture.detectChanges();
        await fixture.whenStable();
        let finishRender!: (updated: boolean) => void;
        host.updateComplete = new Promise((resolve) => {
            finishRender = resolve;
        });
        host.columnDefinitions = [{ key: 'team' }, { key: 'name' }];
        host.dispatchEvent(new Event('dataTableEditorClosed'));
        host.dispatchEvent(new CustomEvent('tableColumnResized', { detail: { columnIndex: 1, width: 240 } }));

        // Act
        finishRender(true);
        await fixture.whenStable();

        // Assert
        expect(table.columns).toBe('100px 240px');
        expect(storedColumns()).toEqual([
            { key: 'team', hidden: false, width: 100 },
            { key: 'name', hidden: false, width: 240 },
        ]);
    });

    it('saves visibility alone for a table that opts out of width persistence', async () => {
        // Arrange
        storeColumns([{ key: 'name', hidden: false, width: 235 }]);
        const { fixture, host, table } = createTable([{ key: 'name' }], false);
        fixture.detectChanges();
        await fixture.whenStable();
        host.columnDefinitions = [{ key: 'name', hidden: true }];

        // Act
        host.dispatchEvent(new Event('dataTableEditorClosed'));

        // Assert
        expect(table.columns).toBe('');
        expect(storedColumns()).toEqual([{ key: 'name', hidden: true }]);
    });

    it('persists a generated column width without replacing stored visibility', async () => {
        // Arrange
        storeColumns([{ key: 'name', hidden: true }]);
        const { fixture, host, table } = createTable([]);
        Object.assign(host, { autoGenerateColumns: true });
        const header = document.createElement('mosaik-table-header-cell');
        Object.assign(header, { key: 'name' });
        table.append(header);
        Object.assign(table, { getColumnMetadata: () => [{ key: 'name', hidden: false, pinned: 'none' }] });
        fixture.detectChanges();
        await fixture.whenStable();

        // Act
        header.dispatchEvent(new CustomEvent('tableColumnResized', { bubbles: true, composed: true, detail: { columnIndex: 0, width: 260 } }));

        // Assert
        expect(storedColumns()).toEqual([{ key: 'name', hidden: true, width: 260 }]);
    });

    it('restores widths in generated header order', async () => {
        // Arrange
        storeColumns([{ key: 'name', hidden: false, width: 260 }]);
        const { fixture, host, table } = createTable([]);
        Object.assign(host, { autoGenerateColumns: true });
        Object.assign(table, {
            getColumnMetadata: () => [
                { key: 'status', hidden: false, pinned: 'none' },
                { key: 'name', hidden: false, pinned: 'none' },
            ],
        });

        // Act
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(table.columns).toBe('1fr 260px');
    });
});

function createTable(columnDefinitions: Array<IDataTableColumnDefinition>, persistColumnWidths = true) {
    TestBed.configureTestingModule({
        providers: [{ provide: USER_PREFERENCE_STORAGE, useValue: new WebStorageUserPreferenceStorage(browserStorage) }],
    });
    const fixture = TestBed.createComponent(TableHostComponent);
    const node = fixture.debugElement.query(By.directive(DataTablePreferencesDirective));
    const directive = node.injector.get(DataTablePreferencesDirective);
    const host = node.nativeElement as ITestDataTableElement;
    const table = document.createElement('mosaik-table') as HTMLElement & { columns: string };
    table.setAttribute('part', 'table');
    table.columns = '';
    host.attachShadow({ mode: 'open' }).append(table);
    host.columnDefinitions = columnDefinitions;
    host.updateComplete = Promise.resolve(true);
    Object.assign(directive, { preferenceKey: signal(PREFERENCE_KEY), persistColumnWidths: signal(persistColumnWidths) });
    return { fixture, host, table };
}

function storeColumns(columns: IDataTablePreferenceState['columns']): void {
    browserStorage.setItem(PREFERENCE_KEY, JSON.stringify({ version: 1, columns }));
}

function storedColumns(): unknown {
    return (JSON.parse(browserStorage.getItem(PREFERENCE_KEY) ?? '{}') as Partial<IDataTablePreferenceState>).columns;
}
