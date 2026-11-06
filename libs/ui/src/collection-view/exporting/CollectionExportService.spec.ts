// #region Imports

import { TestBed } from '@angular/core/testing';
import { DrawerService } from '@pixel-brewery/mosaik-elements-angular';
import { of } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CollectionExportDrawerComponent } from './CollectionExportDrawerComponent';
import { CollectionExportService } from './CollectionExportService';
import type { ICollectionExportDrawerData } from './ICollectionExportDrawerData';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    DrawerService: class DrawerService {},
}));

vi.mock('./CollectionExportDrawerComponent', () => ({
    CollectionExportDrawerComponent: class CollectionExportDrawerComponent {},
}));

describe('CollectionExportService', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('should open the export configuration as a drawer', async () => {
        const data: ICollectionExportDrawerData = { columns: [{ key: 'id', header: 'ID' }] };
        const result = { columns: data.columns, format: 'xlsx' as const };
        const drawerService = {
            show: vi.fn(() => ({ closed: of({ reason: 'positive', result }) })),
        };
        TestBed.configureTestingModule({
            providers: [CollectionExportService, { provide: DrawerService, useValue: drawerService }],
        });
        const service = TestBed.inject(CollectionExportService);

        const actual = await service.open(data);

        expect(drawerService.show).toHaveBeenCalledWith(CollectionExportDrawerComponent, {
            data,
        });
        expect(actual).toEqual(result);
    });

    it('should return undefined when the export drawer is cancelled', async () => {
        const drawerService = {
            show: vi.fn(() => ({ closed: of({ reason: 'negative' }) })),
        };
        TestBed.configureTestingModule({
            providers: [CollectionExportService, { provide: DrawerService, useValue: drawerService }],
        });
        const service = TestBed.inject(CollectionExportService);

        const actual = await service.open({ columns: [{ key: 'id', header: 'ID' }] });

        expect(actual).toBeUndefined();
    });
});
