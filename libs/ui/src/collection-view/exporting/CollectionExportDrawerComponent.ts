// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, signal, viewChild } from '@angular/core';
import {
    ButtonComponent,
    Cancel,
    ChipComponent,
    ChipGroupComponent,
    DRAWER_REF,
    DRAWER_REF_DATA,
    DrawerContentDirective,
    DrawerFooterDirective,
    DrawerHeaderComponent,
    DrawerHeaderDirective,
    FormFieldComponent,
    IconNameDirective,
    SelectComponent,
    SelectItemComponent,
    ToastService,
    ToolbarComponent,
    type IDrawerRef,
} from '@pixel-brewery/mosaik-elements-angular';
import { type IToastVisibility, TOAST_VISIBILITY } from '@pixel-brewery/ngpel-core';
import { CollectionExportDrawerComponentIntl, provideCollectionExportDrawerComponentIntl } from './CollectionExportDrawerComponentIntl';
import type { ICollectionExportColumn } from './ICollectionExportColumn';
import type { CollectionExportFormat, ICollectionExportDrawerData } from './ICollectionExportDrawerData';
import type { ICollectionExportDrawerResult } from './ICollectionExportDrawerResult';

// #endregion

/**
 * Format display metadata.
 */
interface IFormatOption {
    readonly value: CollectionExportFormat;
    readonly label: string;
}

/**
 * A configurable drawer component for collection data export.
 * Allows the user to select which columns to include and which
 * format to export in before triggering the actual download.
 *
 * @public
 */
@Component({
    selector: 'ngp-collection-export-drawer',
    template: `
        <ng-template mosaikDrawerHeader>
            <mosaik-drawer-header [text]="intl.titleLabel" />
        </ng-template>

        <ng-template mosaikDrawerContent>
            <div class="flex min-h-0 flex-col gap-2 px-2 py-2">
                <div class="flex flex-col gap-1">
                    <mosaik-toolbar [appearance]="'plain'">
                        <span></span>
                        <mosaik-button
                            slot="end"
                            [label]="intl.selectAllLabel"
                            [iconName]="'checkboxChecked'"
                            [appearance]="'solid'"
                            [disabled]="!canSelectAll()"
                            (click)="onSelectAll()"
                        />
                        <mosaik-button
                            slot="end"
                            [label]="intl.deselectAllLabel"
                            [iconName]="'checkboxUnchecked'"
                            [appearance]="'solid'"
                            [disabled]="!canDeselectAll()"
                            (click)="onDeselectAll()"
                        />
                    </mosaik-toolbar>

                    <mosaik-form-field [label]="intl.columnsTitleLabel" [hint]="selectedCount() + ' / ' + totalCount() + ' ' + intl.columnsSelectedLabel">
                        <mosaik-chip-group [wrap]="true" [selectionMode]="'multiple'" [value]="selectedColumnValues()" class="surface-input">
                            @for (column of columns(); track column.key) {
                                <mosaik-chip
                                    [label]="column.header"
                                    [value]="column.key"
                                    [appearance]="'soft'"
                                    [variant]="'primary'"
                                    [isCheckable]="true"
                                    (checked)="onColumnChecked(column.key)"
                                    (unchecked)="onColumnUnchecked(column.key)"
                                />
                            }
                        </mosaik-chip-group>
                    </mosaik-form-field>
                </div>
                <div class="flex flex-col gap-1">
                    <mosaik-select [label]="intl.formatTitleLabel" [variant]="'primary'">
                        @for (option of formatOptions(); track option.value) {
                            <mosaik-select-item
                                [value]="option.value"
                                [label]="option.label"
                                [isSelected]="selectedFormat() === option.value"
                                (click)="onFormatChange(option.value)"
                            />
                        }
                    </mosaik-select>
                </div>
            </div>
        </ng-template>

        <ng-template mosaikDrawerFooter>
            <div class="flex flex-1 flex-row gap-1 justify-end">
                <mosaik-button [label]="intl.cancelLabel" [appearance]="'plain'" [variant]="'tertiary'" (click)="onCancel()" />
                <mosaik-button [label]="intl.exportLabel" [appearance]="'solid'" [variant]="'primary'" (click)="onExport()" />
            </div>
        </ng-template>
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        ChipComponent,
        ChipGroupComponent,
        DrawerContentDirective,
        DrawerFooterDirective,
        DrawerHeaderComponent,
        DrawerHeaderDirective,
        SelectComponent,
        SelectItemComponent,
        FormFieldComponent,
        ToolbarComponent,
        IconNameDirective,
    ],
    providers: [
        provideCollectionExportDrawerComponentIntl({
            titleLabel: 'loc.collectionExportDrawer.title',
            columnsTitleLabel: 'loc.collectionExportDrawer.columns.title',
            columnsSelectedLabel: 'loc.collectionExportDrawer.columns.selected',
            selectAllLabel: 'loc.collectionExportDrawer.action.selectAll',
            deselectAllLabel: 'loc.collectionExportDrawer.action.deselectAll',
            formatTitleLabel: 'loc.collectionExportDrawer.format.title',
            xlsxFormatLabel: 'loc.collectionExportDrawer.format.xlsx',
            csvFormatLabel: 'loc.collectionExportDrawer.format.csv',
            odsFormatLabel: 'loc.collectionExportDrawer.format.ods',
            cancelLabel: 'loc.collectionExportDrawer.action.cancel',
            exportLabel: 'loc.collectionExportDrawer.action.export',
            columnsRequiredMessage: 'loc.collectionExportDrawer.validation.columnsRequired',
        }),
    ],
})
export class CollectionExportDrawerComponent implements OnDestroy {
    // #region Fields

    private readonly _chipGroup = viewChild.required(ChipGroupComponent);
    private readonly _drawerRef: IDrawerRef<ICollectionExportDrawerData, ICollectionExportDrawerResult> = inject(DRAWER_REF) as IDrawerRef<
        ICollectionExportDrawerData,
        ICollectionExportDrawerResult
    >;
    private readonly _drawerData: ICollectionExportDrawerData = inject<ICollectionExportDrawerData>(DRAWER_REF_DATA);
    private readonly _intl: CollectionExportDrawerComponentIntl = inject(CollectionExportDrawerComponentIntl);
    private readonly _toastService: ToastService = inject(ToastService);
    private readonly _toastVisibility: IToastVisibility = inject(TOAST_VISIBILITY);
    private readonly _intlVersion = signal(0);
    private readonly _intlChangesSubscription = this._intl.changes.subscribe(() => {
        this._intlVersion.update((version) => version + 1);
    });
    private readonly _selectedColumnKeys = signal<ReadonlySet<string>>(new Set(this._drawerData.columns.map((column) => column.key)));
    private readonly _selectedFormat = signal<CollectionExportFormat>(this._drawerData.defaultFormat ?? 'xlsx');

    // #endregion

    // #region Properties

    /**
     * Internationalization labels.
     */
    public get intl(): CollectionExportDrawerComponentIntl {
        return this._intl;
    }

    /**
     * All available columns for selection.
     */
    public readonly columns = computed<ReadonlyArray<ICollectionExportColumn>>(() => this._drawerData.columns);

    /**
     * Available format options with display labels.
     */
    public readonly formatOptions = computed<ReadonlyArray<IFormatOption>>(() => {
        this._intlVersion();

        const formats = this._drawerData.availableFormats ?? ['xlsx', 'csv', 'ods'];

        return formats.map((format) => ({
            value: format,
            label: this.resolveFormatLabel(format),
        }));
    });

    /**
     * The currently selected format.
     */
    public readonly selectedFormat = this._selectedFormat.asReadonly();

    /**
     * Whether at least one selected column can be deselected.
     */
    public readonly canDeselectAll = computed(() => this._selectedColumnKeys().size > 0);

    /**
     * Whether at least one unselected column can be selected.
     */
    public readonly canSelectAll = computed(() => this._selectedColumnKeys().size < this._drawerData.columns.length);

    /**
     * The number of selected columns.
     */
    public readonly selectedCount = computed(() => this._selectedColumnKeys().size);

    /**
     * The total number of available columns.
     */
    public readonly totalCount = computed(() => this._drawerData.columns.length);

    /**
     * The selected column keys consumed by the chip group.
     */
    protected readonly selectedColumnValues = computed<ReadonlyArray<string>>(() => [...this._selectedColumnKeys()]);

    // #endregion

    // #region Methods

    /**
     * Tears down internationalization change subscriptions.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this._intlChangesSubscription.unsubscribe();
    }

    /**
     * Adds a checked column to the export selection.
     */
    protected onColumnChecked(key: string): void {
        this._selectedColumnKeys.update((keys) => new Set(keys).add(key));
    }

    /**
     * Removes an unchecked column from the export selection.
     */
    protected onColumnUnchecked(key: string): void {
        this._selectedColumnKeys.update((keys) => {
            const next = new Set(keys);
            next.delete(key);
            return next;
        });
    }

    /**
     * Selects all available columns.
     */
    protected onSelectAll(): void {
        this._chipGroup().elementRef.nativeElement.selectAll();
    }

    /**
     * Deselects all columns.
     */
    protected onDeselectAll(): void {
        this._chipGroup().elementRef.nativeElement.deselectAll();
    }

    /**
     * Updates the selected export format.
     */
    protected onFormatChange(format: CollectionExportFormat): void {
        this._selectedFormat.set(format);
    }

    /**
     * Confirms the export configuration and closes the drawer.
     */
    protected onExport(): void {
        const selectedKeys = this._selectedColumnKeys();
        if (selectedKeys.size === 0) {
            if (this._toastVisibility.canShow()) {
                this._toastService.show({
                    content: this._intl.columnsRequiredMessage,
                    iconName: 'warning',
                    variant: 'warning',
                    appearance: 'soft',
                });
            }

            return;
        }

        const selectedColumns = this._drawerData.columns.filter((column) => selectedKeys.has(column.key));

        const result: ICollectionExportDrawerResult = {
            columns: selectedColumns,
            format: this._selectedFormat(),
        };

        this._drawerRef.close(Cancel.positive(result));
    }

    /**
     * Cancels the export and closes the drawer.
     */
    protected onCancel(): void {
        this._drawerRef.close(Cancel.negative());
    }

    private resolveFormatLabel(format: CollectionExportFormat): string {
        return this._intl.getFormatLabel(format);
    }

    // #endregion
}
