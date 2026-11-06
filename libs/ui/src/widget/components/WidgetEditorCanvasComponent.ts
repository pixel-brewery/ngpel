// #region Imports

import { CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDragPreview, CdkDropList, type CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, input, output, type Signal, type TemplateRef } from '@angular/core';
import {
    AvatarComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    DropDownButtonComponent,
    EmptyStateComponent,
    IconNameDirective,
    MenuComponent,
    MenuItemComponent,
    TextComponent,
    TooltipDirective,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IWidgetEditorCanvasZone } from '../models/IWidgetEditorCanvasZone';
import type { IWidgetGridItemDefinition } from '../layout/IWidgetGridItemDefinition';
import type { IWidgetGridItemTemplateContext } from '../models/IWidgetGridItemTemplateContext';
import type { IWidgetGridLabels } from '../models/IWidgetGridLabels';
import type { IWidgetGridItemLayout } from '../layout/IWidgetGridItemLayout';
import type { IWidgetGridLayout } from '../layout/IWidgetGridLayout';
import { WidgetGridDragDirective } from '../directives/WidgetGridDragDirective';
import { WidgetGridItemComponent } from '../components/WidgetGridItemComponent';
import type { IWidgetGridResizePreview } from '../models/IWidgetGridResizePreview';

// #endregion

/** Drop request emitted by the editor canvas for one zone. */
export interface IWidgetGridZoneDropRequest {
    readonly previousIndex: number;
    readonly currentIndex: number;
}

/** Drop request emitted by the editor canvas for one widget. */
export interface IWidgetGridItemDropRequest {
    readonly widgetId: string;
    readonly zoneId: string;
    readonly index: number;
}

/** Relative zone move request emitted by accessible editor controls. */
export interface IWidgetGridZoneMoveRequest {
    readonly zoneId: string;
    readonly delta: number;
}

/** Relative item move request emitted by accessible editor controls. */
export interface IWidgetGridItemMoveRequest {
    readonly widgetId: string;
    readonly delta: number;
}

/** Absolute item resize request emitted after a snapped gesture or menu action. */
export interface IWidgetGridItemResizeRequest extends IWidgetGridResizePreview {
    readonly widgetId: string;
}

/**
 * Visual authoring canvas for semantic zones and their widget grid items.
 *
 * The component owns editor rendering and gesture targets, while persistence and
 * immutable layout mutations remain in `WidgetGridComponent` and `WidgetGridLayout`.
 *
 * @public
 */
@Component({
    selector: 'ngp-widget-editor-canvas',
    imports: [
        CdkDrag,
        CdkDragHandle,
        CdkDragPlaceholder,
        CdkDragPreview,
        CdkDropList,
        AvatarComponent,
        ButtonComponent,
        CardComponent,
        CardContentComponent,
        DropDownButtonComponent,
        EmptyStateComponent,
        IconNameDirective,
        MenuComponent,
        MenuItemComponent,
        TextComponent,
        TooltipDirective,
        WidgetGridDragDirective,
        WidgetGridItemComponent,
    ],
    template: `
        <div
            class="flex min-w-0 flex-col gap-8"
            cdkDropList
            cdkDropListLockAxis="y"
            [cdkDropListData]="zones()"
            [cdkDropListDisabled]="!editable()"
            (cdkDropListDropped)="onZoneDrop($event)"
        >
            @for (zone of zones(); track zone.definition.id) {
                <section
                    class="flex min-w-0 flex-col gap-2"
                    cdkDrag
                    ngpWidgetGridDrag
                    cdkDragLockAxis="y"
                    [cdkDragData]="zone"
                    [cdkDragDisabled]="!editable()"
                    [attr.test-id]="'widget-grid-zone-' + zone.definition.id"
                >
                    <div class="flex min-w-0 items-center gap-2">
                        @if (editable()) {
                            <mosaik-button
                                cdkDragHandle
                                [appearance]="'plain'"
                                [iconName]="'arrowMove'"
                                [mosaikTooltip]="labels().dragZone"
                                [attr.test-id]="'widget-grid-zone-drag-' + zone.definition.id"
                            />
                            <mosaik-dropdown-button
                                [appearance]="'plain'"
                                [caretVisible]="false"
                                [iconName]="'moreHorizontal'"
                                [dropDownPlacement]="'bottom-start'"
                                [mosaikTooltip]="labels().arrangeZone"
                                [attr.test-id]="'widget-grid-zone-actions-' + zone.definition.id"
                            >
                                <span slot="label" class="sr-only">{{ labels().arrangeZone }}</span>
                                <mosaik-menu>
                                    <mosaik-menu-item
                                        [label]="labels().moveZoneEarlier"
                                        [iconName]="'arrowUp'"
                                        [disabled]="!canMoveZone(zone.definition.id, -1)"
                                        [attr.test-id]="'widget-grid-zone-move-earlier-' + zone.definition.id"
                                        (click)="zoneMoved.emit({ zoneId: zone.definition.id, delta: -1 })"
                                        (keydown.enter)="zoneMoved.emit({ zoneId: zone.definition.id, delta: -1 })"
                                        (keydown.space)="$event.preventDefault(); zoneMoved.emit({ zoneId: zone.definition.id, delta: -1 })"
                                    />
                                    <mosaik-menu-item
                                        [label]="labels().moveZoneLater"
                                        [iconName]="'arrowDown'"
                                        [disabled]="!canMoveZone(zone.definition.id, 1)"
                                        [attr.test-id]="'widget-grid-zone-move-later-' + zone.definition.id"
                                        (click)="zoneMoved.emit({ zoneId: zone.definition.id, delta: 1 })"
                                        (keydown.enter)="zoneMoved.emit({ zoneId: zone.definition.id, delta: 1 })"
                                        (keydown.space)="$event.preventDefault(); zoneMoved.emit({ zoneId: zone.definition.id, delta: 1 })"
                                    />
                                </mosaik-menu>
                            </mosaik-dropdown-button>
                        }
                        <mosaik-avatar [size]="'small'" [appearance]="'soft'" [iconName]="zone.definition.iconName" />
                        <div class="flex min-w-0 flex-col">
                            <mosaik-text [text]="zone.definition.label" [wrap]="true" />
                            <mosaik-text [text]="zone.definition.description" [wrap]="true" [readonly]="true" />
                        </div>
                    </div>

                    <div
                        class="widget-editor-canvas__items grid min-w-0 grid-cols-1 auto-rows-[7rem] gap-4 md:grid-cols-2 xl:grid-cols-6"
                        [class.widget-editor-canvas__items--editable]="editable()"
                        cdkDropList
                        cdkDropListOrientation="mixed"
                        data-widget-grid-items
                        [id]="zoneDropListId(zone.definition.id)"
                        [cdkDropListData]="zone.definition.id"
                        [cdkDropListConnectedTo]="zoneDropListIds()"
                        [cdkDropListDisabled]="!editable()"
                        [attr.test-id]="'widget-grid-zone-items-' + zone.definition.id"
                        (cdkDropListDropped)="onItemDrop($event)"
                    >
                        @for (item of zone.items; track item.id) {
                            @if (itemLayout(item.id); as itemPlacement) {
                                <ngp-widget-grid-item
                                    cdkDrag
                                    ngpWidgetGridDrag
                                    [cdkDragData]="item"
                                    [cdkDragDisabled]="!editable()"
                                    [item]="item"
                                    [layout]="itemPlacement"
                                    [itemTemplate]="itemTemplate()"
                                    [labels]="labels()"
                                    [editable]="editable()"
                                    [canMoveEarlier]="canMoveItem(item.id, -1)"
                                    [canMoveLater]="canMoveItem(item.id, 1)"
                                    [canMoveToPreviousZone]="canMoveItemToZone(item.id, -1)"
                                    [canMoveToNextZone]="canMoveItemToZone(item.id, 1)"
                                    (moved)="itemMoved.emit({ widgetId: item.id, delta: $event })"
                                    (movedToZone)="itemMovedToZone.emit({ widgetId: item.id, delta: $event })"
                                    (resized)="itemResized.emit({ widgetId: item.id, columnSpan: $event.columnSpan, rowSpan: $event.rowSpan })"
                                    (resizeActiveChange)="resizeActiveChange.emit($event)"
                                    (hidden)="itemHidden.emit(item)"
                                />
                            }
                        } @empty {
                            @if (editable()) {
                                <mosaik-empty-state class="col-span-1 min-h-28 md:col-span-2 xl:col-span-6" [header]="labels().emptyZone" />
                            }
                        }
                    </div>

                    <ng-template cdkDragPreview>
                        <mosaik-card class="widget-editor-canvas__zone-preview">
                            <mosaik-card-content>
                                <div class="flex min-w-0 items-center gap-3">
                                    <mosaik-avatar [size]="'small'" [appearance]="'soft'" [iconName]="zone.definition.iconName" />
                                    <div class="flex min-w-0 flex-col">
                                        <mosaik-text [text]="zone.definition.label" [wrap]="true" />
                                        <mosaik-text [text]="zone.definition.description" [wrap]="true" [readonly]="true" />
                                    </div>
                                </div>
                            </mosaik-card-content>
                        </mosaik-card>
                    </ng-template>
                    <ng-template cdkDragPlaceholder>
                        <div class="widget-editor-canvas__zone-placeholder">
                            <mosaik-avatar [size]="'small'" [appearance]="'soft'" [iconName]="zone.definition.iconName" />
                            <mosaik-text [text]="zone.definition.label" [wrap]="true" />
                        </div>
                    </ng-template>
                </section>
            } @empty {
                <mosaik-empty-state [header]="labels().emptyTitle" [content]="labels().emptyDescription" />
            }
        </div>
    `,
    styles: `
        :host {
            display: block;
            min-width: 0;
        }

        .widget-editor-canvas__items {
            --widget-grid-accent: var(--mosaik-color-primary-500, #b4232b);
            --widget-grid-columns: 1;
            --widget-grid-gap: 1rem;
            --widget-grid-row-height: 7rem;
            --widget-grid-column-step: calc((100% + var(--widget-grid-gap)) / var(--widget-grid-columns));
            --widget-grid-row-step: calc(var(--widget-grid-row-height) + var(--widget-grid-gap));

            position: relative;
            isolation: isolate;
            border-radius: 0.5rem;
        }

        .widget-editor-canvas__items--editable::before {
            position: absolute;
            z-index: 0;
            inset: 0;
            min-height: 100%;
            border: 1px solid color-mix(in srgb, var(--widget-grid-accent) 34%, transparent);
            border-radius: 0.5rem;
            background-color: color-mix(in srgb, var(--widget-grid-accent) 5%, transparent);
            background-image:
                repeating-linear-gradient(
                    to right,
                    color-mix(in srgb, var(--widget-grid-accent) 34%, transparent) 0 1px,
                    transparent 1px var(--widget-grid-column-step)
                ),
                repeating-linear-gradient(
                    to bottom,
                    color-mix(in srgb, var(--widget-grid-accent) 34%, transparent) 0 1px,
                    transparent 1px var(--widget-grid-row-step)
                );
            pointer-events: none;
            content: '';
        }

        .widget-editor-canvas__items > * {
            z-index: 1;
        }

        @media (min-width: 48rem) {
            .widget-editor-canvas__items {
                --widget-grid-columns: 2;
            }
        }

        @media (min-width: 80rem) {
            .widget-editor-canvas__items {
                --widget-grid-columns: 6;
            }
        }

        .widget-editor-canvas__zone-preview {
            display: block;
            width: 22rem;
            max-width: calc(100vw - 2rem);
            border: 2px solid var(--mosaik-color-primary-500, #b4232b);
            border-radius: 0.5rem;
            box-shadow: var(--mosaik-elevation-3);
            opacity: 0.96;
        }

        .widget-editor-canvas__zone-placeholder {
            display: flex;
            min-height: 7rem;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            border: 2px dashed var(--mosaik-color-primary-500, #b4232b);
            border-radius: 0.5rem;
            color: var(--mosaik-color-primary-700, #8f1720);
            background: color-mix(in srgb, var(--mosaik-color-primary-500, #b4232b) 10%, transparent);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetEditorCanvasComponent {
    // #region Fields

    private readonly _itemLayouts: Signal<ReadonlyMap<string, IWidgetGridItemLayout>> = computed(
        () => new Map(this.layout().items.map((item) => [item.widgetId, item])),
    );

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /** Ordered zones and enabled items rendered on the canvas. */
    public readonly zones = input.required<ReadonlyArray<IWidgetEditorCanvasZone>>();

    /** Current persisted layout used for item spans and control availability. */
    public readonly layout = input.required<IWidgetGridLayout>();

    /** Owning feature's concrete widget template. */
    public readonly itemTemplate = input.required<TemplateRef<IWidgetGridItemTemplateContext>>();

    /** Resolved editor labels. */
    public readonly labels = input.required<IWidgetGridLabels>();

    /** Whether authoring chrome and the snap grid are visible. */
    public readonly editable = input(false);

    /** Requests one zone reorder. */
    public readonly zoneDropped = output<IWidgetGridZoneDropRequest>();

    /** Requests one widget move within or across zones. */
    public readonly itemDropped = output<IWidgetGridItemDropRequest>();

    /** Requests one accessible relative zone move. */
    public readonly zoneMoved = output<IWidgetGridZoneMoveRequest>();

    /** Requests one accessible relative item move. */
    public readonly itemMoved = output<IWidgetGridItemMoveRequest>();

    /** Requests a widget move to a neighboring zone. */
    public readonly itemMovedToZone = output<IWidgetGridItemMoveRequest>();

    /** Requests one absolute snapped widget size. */
    public readonly itemResized = output<IWidgetGridItemResizeRequest>();

    /** Emits when a widget starts or ends a pointer resize. */
    public readonly resizeActiveChange = output<boolean>();

    /** Requests hiding one widget from the canvas. */
    public readonly itemHidden = output<IWidgetGridItemDefinition>();

    /** Connected item drop-list identifiers. */
    protected readonly zoneDropListIds: Signal<Array<string>> = computed(() => this.zones().map((zone) => this.zoneDropListId(zone.definition.id)));

    // #endregion

    // #region Methods

    /** Converts an Angular CDK zone drop into a stable request. */
    protected onZoneDrop(event: CdkDragDrop<ReadonlyArray<IWidgetEditorCanvasZone>>): void {
        if (!this.editable() || event.previousIndex === event.currentIndex) {
            return;
        }

        this.zoneDropped.emit({ previousIndex: event.previousIndex, currentIndex: event.currentIndex });
    }

    /** Converts an Angular CDK item drop into a stable request. */
    protected onItemDrop(event: CdkDragDrop<string, string, IWidgetGridItemDefinition>): void {
        if (!this.editable()) {
            return;
        }

        this.itemDropped.emit({
            widgetId: event.item.data.id,
            zoneId: event.container.data,
            index: event.currentIndex,
        });
    }

    /** Current persisted item placement. */
    protected itemLayout(widgetId: string): IWidgetGridItemLayout | undefined {
        return this._itemLayouts().get(widgetId);
    }

    /** Whether a zone can move in the requested direction. */
    protected canMoveZone(zoneId: string, delta: number): boolean {
        const zones = this.orderedZoneLayouts();
        const currentIndex = zones.findIndex((zone) => zone.zoneId === zoneId);
        const targetIndex = currentIndex + delta;

        return currentIndex >= 0 && targetIndex >= 0 && targetIndex < zones.length;
    }

    /** Whether a widget can move in the requested direction inside its zone. */
    protected canMoveItem(widgetId: string, delta: number): boolean {
        const item = this._itemLayouts().get(widgetId);

        if (!item) {
            return false;
        }

        const items = this.orderedEnabledItems(item.zoneId);
        const currentIndex = items.findIndex((candidate) => candidate.widgetId === widgetId);
        const targetIndex = currentIndex + delta;

        return currentIndex >= 0 && targetIndex >= 0 && targetIndex < items.length;
    }

    /** Whether a widget can move to a neighboring zone. */
    protected canMoveItemToZone(widgetId: string, delta: number): boolean {
        const item = this._itemLayouts().get(widgetId);

        if (!item) {
            return false;
        }

        const zones = this.orderedZoneLayouts();
        const currentIndex = zones.findIndex((zone) => zone.zoneId === item.zoneId);
        const targetIndex = currentIndex + delta;

        return currentIndex >= 0 && targetIndex >= 0 && targetIndex < zones.length;
    }

    /** Stable item drop-list id for one zone. */
    protected zoneDropListId(zoneId: string): string {
        return `widget-grid-zone-${zoneId}`;
    }

    private orderedZoneLayouts(): IWidgetGridLayout['zones'] {
        return [...this.layout().zones].sort((left, right) => left.order - right.order);
    }

    private orderedEnabledItems(zoneId: string): IWidgetGridLayout['items'] {
        return this.layout()
            .items.filter((item) => item.enabled && item.zoneId === zoneId)
            .sort((left, right) => left.order - right.order || left.widgetId.localeCompare(right.widgetId));
    }

    // #endregion
}
