// #region Imports

import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DATA_TABLE_INTL, TABLE_COLUMN_EDITOR_INTL, TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import type { DataTableElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideDataTableIntl } from './DataTableIntl';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    DATA_TABLE_INTL: new InjectionToken<Partial<DataTableElementIntl>>('MOSAIK_DATA_TABLE_INTL'),
    TABLE_COLUMN_EDITOR_INTL: new InjectionToken('MOSAIK_TABLE_COLUMN_EDITOR_INTL'),
    TABLE_INTL: new InjectionToken('MOSAIK_TABLE_INTL'),
    TranslateService: class {},
}));

vi.mock('@pixel-brewery/mosaik-elements-foundation', () => ({
    DataTableElementIntl: class {
        public chooseColumnsLabel = 'Choose columns';
        public columnEditor = {
            header: 'Choose columns',
            searchPlaceholder: 'Search...',
            allColumnsLabel: 'All columns',
        };
    },
    TableElementIntl: class {},
}));

describe('provideDataTableIntl', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideDataTableIntl({
                    chooseColumnsLabel: 'loc.dataTable.chooseColumns',
                }),
                {
                    provide: TABLE_COLUMN_EDITOR_INTL,
                    useValue: {
                        header: 'translated:loc.dataTable.editor.header',
                        searchPlaceholder: 'translated:loc.dataTable.editor.searchPlaceholder',
                        allColumnsLabel: 'translated:loc.dataTable.editor.allColumns',
                    },
                },
                {
                    provide: TranslateService,
                    useValue: {
                        translate: (key: string): string => `translated:${key}`,
                    },
                },
            ],
        });
    });

    it('composes translated table and embedded column editor labels', () => {
        // arrange & act
        const intl = TestBed.inject<Partial<DataTableElementIntl>>(DATA_TABLE_INTL);

        // assert
        expect(intl.chooseColumnsLabel).toBe('translated:loc.dataTable.chooseColumns');
        expect(intl.columnEditor?.header).toBe('translated:loc.dataTable.editor.header');
        expect(intl.columnEditor?.searchPlaceholder).toBe('translated:loc.dataTable.editor.searchPlaceholder');
        expect(intl.columnEditor?.allColumnsLabel).toBe('translated:loc.dataTable.editor.allColumns');
    });
});
