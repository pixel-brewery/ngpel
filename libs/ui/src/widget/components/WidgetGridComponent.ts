// #region Imports

import { ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, input, output, signal, untracked, type Signal } from '@angular/core';
import { USER_PREFERENCE_STORAGE, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import { createDefaultWidgetGridLayout } from '../layout/createDefaultWidgetGridLayout';
import type { IWidgetGridItemDefinition } from '../layout/IWidgetGridItemDefinition';
import type { IWidgetGridLayout } from '../layout/IWidgetGridLayout';
import type { IWidgetGridZoneDefinition } from '../layout/IWidgetGridZoneDefinition';
import { moveWidgetGridItem } from '../layout/moveWidgetGridItem';
import { moveWidgetGridZone } from '../layout/moveWidgetGridZone';
import { reconcileWidgetGridLayout } from '../layout/reconcileWidgetGridLayout';
import { resizeWidgetGridItem } from '../layout/resizeWidgetGridItem';
import { setWidgetGridItemEnabled } from '../layout/setWidgetGridItemEnabled';
import { WIDGET_GRID_LAYOUT_CODEC } from '../layout/WIDGET_GRID_LAYOUT_CODEC';
import { WIDGET_GRID_LAYOUT_VERSION } from '../layout/WIDGET_GRID_LAYOUT_VERSION';
import type { IWidgetEditorCanvasZone } from '../models/IWidgetEditorCanvasZone';
import type { IWidgetGridLabels } from '../models/IWidgetGridLabels';
import { WidgetGridItemTemplate } from '../models/WidgetGridItemTemplate';
import {
    WidgetEditorCanvasComponent,
    type IWidgetGridItemDropRequest,
    type IWidgetGridItemMoveRequest,
    type IWidgetGridItemResizeRequest,
    type IWidgetGridZoneDropRequest,
    type IWidgetGridZoneMoveRequest,
} from './WidgetEditorCanvasComponent';

// #endregion

/**
 * Generic configurable widget grid with local persistence.
 *
 * @public
 */
@Component({
    selector: 'ngp-widget-grid',
    host: { class: 'block min-w-0' },
    imports: [WidgetEditorCanvasComponent],
    template: `
        <ngp-widget-editor-canvas
            [zones]="renderedZones()"
            [layout]="layout()"
            [itemTemplate]="itemTemplate().template"
            [labels]="labels()"
            [editable]="editable()"
            (zoneDropped)="onZoneDrop($event)"
            (itemDropped)="onItemDrop($event)"
            (zoneMoved)="moveZone($event)"
            (itemMoved)="moveItem($event)"
            (itemMovedToZone)="moveItemToZone($event)"
            (itemResized)="resizeItem($event)"
            (itemHidden)="toggleItem($event)"
        />
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetGridComponent {
    // #region Fields

    private readonly _storage: IUserPreferenceStorage = inject(USER_PREFERENCE_STORAGE);
    private readonly _layout = signal<IWidgetGridLayout>({
        version: WIDGET_GRID_LAYOUT_VERSION,
        zones: [],
        items: [],
    });
    private _restoredPreferenceKey: string | undefined;

    // #endregion

    // #region Ctor

    /** Creates and continuously reconciles the grid with its contributed definitions. */
    public constructor() {
        effect(() => {
            const preferenceKey = this.persistenceKey();
            const zones = this.zones();
            const items = this.items();
            const shouldRestore = preferenceKey !== this._restoredPreferenceKey;
            const baseLayout = shouldRestore ? this._storage.read(preferenceKey, WIDGET_GRID_LAYOUT_CODEC) : untracked(this._layout);
            const nextLayout = reconcileWidgetGridLayout(baseLayout, zones, items);

            this._restoredPreferenceKey = preferenceKey;
            this._layout.set(nextLayout);
            this.layoutChange.emit(nextLayout);
        });
    }

    // #endregion

    // #region Properties

    /** Semantic zones supported by the current page. */
    public readonly zones = input.required<ReadonlyArray<IWidgetGridZoneDefinition>>();

    /** Registry-derived widgets currently available to the user. */
    public readonly items = input.required<ReadonlyArray<IWidgetGridItemDefinition>>();

    /** Stable local preference key. */
    public readonly persistenceKey = input.required<string>();

    /** Resolved labels for editor and empty states. */
    public readonly labels = input.required<IWidgetGridLabels>();

    /** Whether zone and widget authoring controls are active. */
    public readonly editable = input(false);

    /** Emits the restored layout and every subsequent user change. */
    public readonly layoutChange = output<IWidgetGridLayout>();

    /** Current reconciled layout. */
    public readonly layout: Signal<IWidgetGridLayout> = this._layout.asReadonly();

    /** Owning feature template marked with `ngpWidgetGridItem`. */
    protected readonly itemTemplate = contentChild.required(WidgetGridItemTemplate);

    /** Zones and enabled items in their persisted order. */
    protected readonly renderedZones: Signal<ReadonlyArray<IWidgetEditorCanvasZone>> = computed(() => {
        const definitionsById = new Map(this.zones().map((zone) => [zone.id, zone]));
        const itemsById = new Map(this.items().map((item) => [item.id, item]));
        const layout = this._layout();

        return [...layout.zones]
            .sort((left, right) => left.order - right.order)
            .flatMap((zoneLayout): ReadonlyArray<IWidgetEditorCanvasZone> => {
                const definition = definitionsById.get(zoneLayout.zoneId);

                if (!definition) {
                    return [];
                }

                const items = layout.items
                    .filter((item) => item.enabled && item.zoneId === definition.id)
                    .sort((left, right) => left.order - right.order)
                    .flatMap((item): ReadonlyArray<IWidgetGridItemDefinition> => {
                        const itemDefinition = itemsById.get(item.widgetId);
                        return itemDefinition ? [itemDefinition] : [];
                    });

                return this.editable() || items.length > 0 ? [{ definition, items }] : [];
            });
    });

    // #endregion

    // #region Methods

    /** Applies a zone reorder emitted by the editor canvas. */
    protected onZoneDrop(request: IWidgetGridZoneDropRequest): void {
        this.commit(moveWidgetGridZone(this._layout(), request.previousIndex, request.currentIndex));
    }

    /** Moves a widget within or across connected Angular CDK drop lists. */
    protected onItemDrop(request: IWidgetGridItemDropRequest): void {
        this.commit(moveWidgetGridItem(this._layout(), request.widgetId, request.zoneId, request.index));
    }

    /** Moves a zone one position without requiring a drag gesture. */
    protected moveZone(request: IWidgetGridZoneMoveRequest): void {
        const zones = this.orderedZoneLayouts();
        const currentIndex = zones.findIndex((zone) => zone.zoneId === request.zoneId);
        const targetIndex = currentIndex + request.delta;

        if (currentIndex < 0 || targetIndex < 0 || targetIndex >= zones.length) {
            return;
        }

        this.commit(moveWidgetGridZone(this._layout(), currentIndex, targetIndex));
    }

    /** Reorders a widget inside its current zone without requiring a drag gesture. */
    protected moveItem(request: IWidgetGridItemMoveRequest): void {
        const item = this._layout().items.find((candidate) => candidate.widgetId === request.widgetId);

        if (!item) {
            return;
        }

        const items = this.orderedEnabledItems(item.zoneId);
        const currentIndex = items.findIndex((candidate) => candidate.widgetId === request.widgetId);
        const targetIndex = currentIndex + request.delta;

        if (currentIndex < 0 || targetIndex < 0 || targetIndex >= items.length) {
            return;
        }

        this.commit(moveWidgetGridItem(this._layout(), request.widgetId, item.zoneId, targetIndex));
    }

    /** Moves a widget to the preceding or following zone without requiring a drag gesture. */
    protected moveItemToZone(request: IWidgetGridItemMoveRequest): void {
        const item = this._layout().items.find((candidate) => candidate.widgetId === request.widgetId);

        if (!item) {
            return;
        }

        const zones = this.orderedZoneLayouts();
        const currentZoneIndex = zones.findIndex((zone) => zone.zoneId === item.zoneId);
        const targetZone = zones[currentZoneIndex + request.delta];

        if (!targetZone) {
            return;
        }

        this.commit(moveWidgetGridItem(this._layout(), request.widgetId, targetZone.zoneId, this.orderedEnabledItems(targetZone.zoneId).length));
    }

    /** Applies an absolute snapped size emitted by the editor canvas. */
    protected resizeItem(request: IWidgetGridItemResizeRequest): void {
        const definition = this.items().find((item) => item.id === request.widgetId);
        const placement = this._layout().items.find((item) => item.widgetId === request.widgetId);

        if (!definition || !placement) {
            return;
        }

        this.commit(resizeWidgetGridItem(this._layout(), definition, request.columnSpan - placement.columnSpan, request.rowSpan - placement.rowSpan));
    }

    /** Toggles one widget without losing its previous placement. */
    public toggleItem(item: IWidgetGridItemDefinition): void {
        this.commit(setWidgetGridItemEnabled(this._layout(), item.id, !this.isItemEnabled(item.id)));
    }

    /** Restores the contributed default layout and removes the local override. */
    public resetLayout(): void {
        const layout = createDefaultWidgetGridLayout(this.zones(), this.items());
        this._storage.remove(this.persistenceKey());
        this._layout.set(layout);
        this.layoutChange.emit(layout);
    }

    /** Whether an available item is currently rendered. */
    private isItemEnabled(itemId: string): boolean {
        return this._layout().items.find((item) => item.widgetId === itemId)?.enabled === true;
    }

    private commit(layout: IWidgetGridLayout): void {
        this._layout.set(layout);
        this._storage.write(this.persistenceKey(), layout, WIDGET_GRID_LAYOUT_CODEC);
        this.layoutChange.emit(layout);
    }

    private orderedZoneLayouts(): IWidgetGridLayout['zones'] {
        return [...this._layout().zones].sort((left, right) => left.order - right.order);
    }

    private orderedEnabledItems(zoneId: string): IWidgetGridLayout['items'] {
        return this._layout()
            .items.filter((item) => item.enabled && item.zoneId === zoneId)
            .sort((left, right) => left.order - right.order || left.widgetId.localeCompare(right.widgetId));
    }

    // #endregion
}
