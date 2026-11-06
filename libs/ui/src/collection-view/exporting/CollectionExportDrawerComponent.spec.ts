// #region Imports

import { TestBed } from '@angular/core/testing';
import { DRAWER_REF, DRAWER_REF_DATA, ToastService } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CollectionExportDrawerComponent } from './CollectionExportDrawerComponent';
import { CollectionExportDrawerComponentIntl } from './CollectionExportDrawerComponentIntl';
import type { ICollectionExportDrawerData } from './ICollectionExportDrawerData';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    return {
        ButtonComponent: class ButtonComponent {},
        Cancel: {
            positive: (result?: unknown) => ({ reason: 'positive', result }),
            negative: (result?: unknown) => ({ reason: 'negative', result }),
        },
        ChipComponent: class ChipComponent {},
        ChipGroupComponent: class ChipGroupComponent {},
        DRAWER_REF: new angular.InjectionToken('DRAWER_REF'),
        DRAWER_REF_DATA: new angular.InjectionToken('DRAWER_REF_DATA'),
        DrawerContentDirective: class DrawerContentDirective {},
        DrawerFooterDirective: class DrawerFooterDirective {},
        DrawerHeaderComponent: class DrawerHeaderComponent {},
        DrawerHeaderDirective: class DrawerHeaderDirective {},
        FormFieldComponent: class FormFieldComponent {},
        IconNameDirective: class IconNameDirective {},
        SelectComponent: class SelectComponent {},
        SelectItemComponent: class SelectItemComponent {},
        ToastService: class ToastService {},
        ToolbarComponent: class ToolbarComponent {},
    };
});

describe('CollectionExportDrawerComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('should select every available column when the dialog opens', () => {
        const drawerData: ICollectionExportDrawerData = {
            columns: [
                { key: 'id', header: 'ID' },
                { key: 'name', header: 'Name' },
                { key: 'createdAt', header: 'Created at' },
            ],
        };
        TestBed.configureTestingModule({
            providers: [
                { provide: DRAWER_REF, useValue: { close: vi.fn() } },
                { provide: DRAWER_REF_DATA, useValue: drawerData },
                {
                    provide: CollectionExportDrawerComponentIntl,
                    useFactory: () => new CollectionExportDrawerComponentIntl(),
                },
                {
                    provide: ToastService,
                    useValue: { show: vi.fn() },
                },
            ],
        });

        const component = TestBed.runInInjectionContext(() => new CollectionExportDrawerComponent());

        expect(component.selectedCount()).toBe(3);
        expect(component.totalCount()).toBe(3);
        expect(component.canSelectAll()).toBe(false);
        expect(component.canDeselectAll()).toBe(true);
        component.ngOnDestroy();
    });

    it('should keep the export action available and explain a missing column selection', () => {
        const close = vi.fn();
        const showToast = vi.fn();
        const drawerData: ICollectionExportDrawerData = {
            columns: [{ key: 'id', header: 'ID' }],
        };
        TestBed.configureTestingModule({
            providers: [
                { provide: DRAWER_REF, useValue: { close } },
                { provide: DRAWER_REF_DATA, useValue: drawerData },
                {
                    provide: CollectionExportDrawerComponentIntl,
                    useFactory: () => new CollectionExportDrawerComponentIntl(),
                },
                {
                    provide: ToastService,
                    useValue: { show: showToast },
                },
            ],
        });
        const component = TestBed.runInInjectionContext(() => new CollectionExportDrawerComponent());
        const actions = component as unknown as {
            onColumnUnchecked(key: string): void;
            onExport(): void;
        };

        actions.onColumnUnchecked('id');
        actions.onExport();

        expect(close).not.toHaveBeenCalled();
        expect(showToast).toHaveBeenCalledWith({
            content: 'Select at least one column before exporting.',
            iconName: 'warning',
            variant: 'warning',
            appearance: 'soft',
        });
        component.ngOnDestroy();
    });
});
