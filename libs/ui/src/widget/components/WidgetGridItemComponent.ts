// #region Imports

import { CdkDragHandle, CdkDragPlaceholder, CdkDragPreview } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal, type Signal, type TemplateRef } from '@angular/core';
import {
    AvatarComponent,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    DividerComponent,
    DropDownButtonComponent,
    IconNameDirective,
    MenuComponent,
    MenuItemComponent,
    ThumbComponent,
    TooltipDirective,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IWidgetGridItemDefinition } from '../layout/IWidgetGridItemDefinition';
import type { IWidgetGridItemTemplateContext } from '../models/IWidgetGridItemTemplateContext';
import type { IWidgetGridLabels } from '../models/IWidgetGridLabels';
import type { IWidgetGridItemLayout } from '../layout/IWidgetGridItemLayout';
import { WidgetGridResizeDirective, type IWidgetGridResizeConfiguration } from '../directives/WidgetGridResizeDirective';
import type { IWidgetGridResizePreview } from '../models/IWidgetGridResizePreview';

// #endregion

/**
 * Renders one editable widget-grid item including controls, ghost, placeholder, and resize feedback.
 *
 * @public
 */
@Component({
    selector: 'ngp-widget-grid-item',
    imports: [
        NgTemplateOutlet,
        CdkDragHandle,
        CdkDragPlaceholder,
        CdkDragPreview,
        AvatarComponent,
        ButtonComponent,
        CardComponent,
        CardHeaderComponent,
        DividerComponent,
        DropDownButtonComponent,
        IconNameDirective,
        MenuComponent,
        MenuItemComponent,
        ThumbComponent,
        TooltipDirective,
        WidgetGridResizeDirective,
    ],
    template: `
        @if (editable()) {
            <div class="absolute left-2 top-2 z-10 flex items-center gap-1">
                <mosaik-button
                    cdkDragHandle
                    [appearance]="'solid'"
                    [variant]="'primary'"
                    [iconName]="'arrowMove'"
                    [mosaikTooltip]="labels().dragWidget"
                    [attr.test-id]="'widget-grid-item-drag-' + item().id"
                />
                <mosaik-dropdown-button
                    [appearance]="'solid'"
                    [variant]="'primary'"
                    [caretVisible]="false"
                    [iconName]="'moreHorizontal'"
                    [dropDownPlacement]="'bottom-start'"
                    [mosaikTooltip]="labels().arrangeWidget"
                    [attr.test-id]="'widget-grid-item-actions-' + item().id"
                >
                    <span slot="label" class="sr-only">{{ labels().arrangeWidget }}</span>
                    <mosaik-menu>
                        <mosaik-menu-item
                            [label]="labels().moveWidgetEarlier"
                            [subLabel]="labels().moveWidgetDescription"
                            [iconName]="'arrowUp'"
                            [disabled]="!canMoveEarlier()"
                            [attr.test-id]="'widget-grid-item-move-earlier-' + item().id"
                            (click)="moved.emit(-1)"
                            (keydown.enter)="moved.emit(-1)"
                            (keydown.space)="$event.preventDefault(); moved.emit(-1)"
                        />
                        <mosaik-menu-item
                            [label]="labels().moveWidgetLater"
                            [subLabel]="labels().moveWidgetDescription"
                            [iconName]="'arrowDown'"
                            [disabled]="!canMoveLater()"
                            [attr.test-id]="'widget-grid-item-move-later-' + item().id"
                            (click)="moved.emit(1)"
                            (keydown.enter)="moved.emit(1)"
                            (keydown.space)="$event.preventDefault(); moved.emit(1)"
                        />
                        <mosaik-menu-item
                            [label]="labels().moveWidgetToPreviousZone"
                            [subLabel]="labels().moveWidgetDescription"
                            [iconName]="'arrowLeft'"
                            [disabled]="!canMoveToPreviousZone()"
                            [attr.test-id]="'widget-grid-item-move-previous-zone-' + item().id"
                            (click)="movedToZone.emit(-1)"
                            (keydown.enter)="movedToZone.emit(-1)"
                            (keydown.space)="$event.preventDefault(); movedToZone.emit(-1)"
                        />
                        <mosaik-menu-item
                            [label]="labels().moveWidgetToNextZone"
                            [subLabel]="labels().moveWidgetDescription"
                            [iconName]="'arrowRight'"
                            [disabled]="!canMoveToNextZone()"
                            [attr.test-id]="'widget-grid-item-move-next-zone-' + item().id"
                            (click)="movedToZone.emit(1)"
                            (keydown.enter)="movedToZone.emit(1)"
                            (keydown.space)="$event.preventDefault(); movedToZone.emit(1)"
                        />
                        <mosaik-divider />
                        <mosaik-menu-item
                            [label]="labels().makeWidgetNarrower"
                            [subLabel]="labels().resizeWidgetDescription"
                            [iconName]="'arrowLeft'"
                            [disabled]="!canResize(-1, 0)"
                            [attr.test-id]="'widget-grid-item-narrower-' + item().id"
                            (click)="resizeBy(-1, 0)"
                            (keydown.enter)="resizeBy(-1, 0)"
                            (keydown.space)="$event.preventDefault(); resizeBy(-1, 0)"
                        />
                        <mosaik-menu-item
                            [label]="labels().makeWidgetWider"
                            [subLabel]="labels().resizeWidgetDescription"
                            [iconName]="'arrowRight'"
                            [disabled]="!canResize(1, 0)"
                            [attr.test-id]="'widget-grid-item-wider-' + item().id"
                            (click)="resizeBy(1, 0)"
                            (keydown.enter)="resizeBy(1, 0)"
                            (keydown.space)="$event.preventDefault(); resizeBy(1, 0)"
                        />
                        <mosaik-menu-item
                            [label]="labels().makeWidgetShorter"
                            [subLabel]="labels().resizeWidgetDescription"
                            [iconName]="'arrowUp'"
                            [disabled]="!canResize(0, -1)"
                            [attr.test-id]="'widget-grid-item-shorter-' + item().id"
                            (click)="resizeBy(0, -1)"
                            (keydown.enter)="resizeBy(0, -1)"
                            (keydown.space)="$event.preventDefault(); resizeBy(0, -1)"
                        />
                        <mosaik-menu-item
                            [label]="labels().makeWidgetTaller"
                            [subLabel]="labels().resizeWidgetDescription"
                            [iconName]="'arrowDown'"
                            [disabled]="!canResize(0, 1)"
                            [attr.test-id]="'widget-grid-item-taller-' + item().id"
                            (click)="resizeBy(0, 1)"
                            (keydown.enter)="resizeBy(0, 1)"
                            (keydown.space)="$event.preventDefault(); resizeBy(0, 1)"
                        />
                        <mosaik-divider />
                        <mosaik-menu-item
                            [label]="labels().hide"
                            [subLabel]="labels().hideWidgetDescription"
                            [iconName]="'eyeOff'"
                            [attr.test-id]="'widget-grid-item-hide-' + item().id"
                            (click)="hidden.emit()"
                            (keydown.enter)="hidden.emit()"
                            (keydown.space)="$event.preventDefault(); hidden.emit()"
                        />
                    </mosaik-menu>
                </mosaik-dropdown-button>
            </div>

            <div class="widget-grid-resize-frame" aria-hidden="true">
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--top-left"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'top-left'"
                    [attr.test-id]="'widget-grid-item-resize-top-left-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'corner'" />
                </div>
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--top"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'top'"
                    [attr.test-id]="'widget-grid-item-resize-top-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'horizontal'" />
                </div>
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--top-right"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'top-right'"
                    [attr.test-id]="'widget-grid-item-resize-top-right-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'corner'" />
                </div>
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--right"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'right'"
                    [attr.test-id]="'widget-grid-item-resize-right-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'vertical'" />
                </div>
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--bottom-right"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'bottom-right'"
                    [attr.test-id]="'widget-grid-item-resize-corner-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'corner'" />
                </div>
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--bottom"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'bottom'"
                    [attr.test-id]="'widget-grid-item-resize-bottom-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'horizontal'" />
                </div>
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--bottom-left"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'bottom-left'"
                    [attr.test-id]="'widget-grid-item-resize-bottom-left-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'corner'" />
                </div>
                <div
                    class="widget-grid-resize-adornment widget-grid-resize-adornment--left"
                    [ngpWidgetGridResize]="resizeConfiguration()"
                    [widgetGridResizeDirection]="'left'"
                    [attr.test-id]="'widget-grid-item-resize-left-' + item().id"
                    (widgetGridResizePreview)="onResizePreview($event)"
                    (widgetGridResized)="onResized($event)"
                >
                    <mosaik-thumb [edge]="'vertical'" />
                </div>
            </div>
        }

        <div class="h-full min-h-0 min-w-0" [attr.inert]="editable() ? '' : null">
            <ng-container *ngTemplateOutlet="itemTemplate(); context: itemTemplateContext()" />
        </div>

        @if (resizePreview(); as preview) {
            <div class="widget-grid-resize-target" [attr.test-id]="'widget-grid-item-resize-preview-' + item().id" aria-hidden="true">
                <span>{{ preview.columnSpan }} × {{ preview.rowSpan }}</span>
            </div>
        }

        <ng-template cdkDragPreview [matchSize]="true">
            <div class="widget-grid-item-preview" [attr.test-id]="'widget-grid-item-preview-' + item().id">
                <mosaik-card class="block h-full">
                    <mosaik-card-header [text]="item().title" [subText]="item().description ?? ''">
                        <mosaik-avatar slot="prefix" [size]="'small'" [appearance]="'soft'" [iconName]="item().iconName ?? 'board'" />
                    </mosaik-card-header>
                </mosaik-card>
            </div>
        </ng-template>

        <ng-template cdkDragPlaceholder>
            <div
                class="widget-grid-item-placeholder"
                [style.--widget-grid-column-span]="layout().columnSpan"
                [style.--widget-grid-column-span-md]="layout().columnSpan > 2 ? 2 : layout().columnSpan"
                [style.--widget-grid-row-span]="layout().rowSpan"
                [attr.test-id]="'widget-grid-item-placeholder-' + item().id"
            >
                <mosaik-avatar [size]="'small'" [appearance]="'soft'" [iconName]="item().iconName ?? 'board'" />
                <span>{{ item().title }}</span>
            </div>
        </ng-template>
    `,
    styles: `
        :host {
            position: relative;
            display: block;
            min-width: 0;
            min-height: 0;
            grid-column: span 1;
            grid-row: span var(--widget-grid-row-span);
        }

        .widget-grid-item-placeholder {
            position: relative;
            z-index: 1;
            display: flex;
            min-width: 0;
            min-height: 0;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            grid-column: span 1;
            grid-row: span var(--widget-grid-row-span);
            border: 2px dashed var(--mosaik-color-primary-500, #b4232b);
            border-radius: 0.5rem;
            color: var(--mosaik-color-primary-700, #8f1720);
            background: color-mix(in srgb, var(--mosaik-color-primary-500, #b4232b) 10%, transparent);
        }

        @media (min-width: 48rem) {
            :host,
            .widget-grid-item-placeholder {
                grid-column: span var(--widget-grid-column-span-md);
            }
        }

        @media (min-width: 80rem) {
            :host,
            .widget-grid-item-placeholder {
                grid-column: span var(--widget-grid-column-span);
            }
        }

        .widget-grid-item-preview {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border: 2px solid var(--mosaik-color-primary-500, #b4232b);
            border-radius: 0.5rem;
            background: var(--mosaik-scheme-surface);
            box-shadow: var(--mosaik-elevation-3);
            opacity: 0.96;
        }

        .widget-grid-resize-frame {
            position: absolute;
            z-index: 20;
            inset: 0;
            border: 1px solid color-mix(in srgb, var(--mosaik-color-primary-500, #b4232b) 72%, transparent);
            border-radius: 0.5rem;
            pointer-events: none;
        }

        .widget-grid-resize-adornment {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
            touch-action: none;
        }

        .widget-grid-resize-adornment--left,
        .widget-grid-resize-adornment--right {
            top: 1rem;
            bottom: 1rem;
            width: 1rem;
            cursor: ew-resize;
        }

        .widget-grid-resize-adornment--left {
            left: -0.5rem;
        }

        .widget-grid-resize-adornment--right {
            right: -0.5rem;
        }

        .widget-grid-resize-adornment--top,
        .widget-grid-resize-adornment--bottom {
            right: 1rem;
            left: 1rem;
            height: 1rem;
            cursor: ns-resize;
        }

        .widget-grid-resize-adornment--top {
            top: -0.5rem;
        }

        .widget-grid-resize-adornment--bottom {
            bottom: -0.5rem;
        }

        .widget-grid-resize-adornment--top-left,
        .widget-grid-resize-adornment--top-right,
        .widget-grid-resize-adornment--bottom-right,
        .widget-grid-resize-adornment--bottom-left {
            bottom: -0.625rem;
            width: 1.25rem;
            height: 1.25rem;
        }

        .widget-grid-resize-adornment--top-left,
        .widget-grid-resize-adornment--bottom-right {
            cursor: nwse-resize;
        }

        .widget-grid-resize-adornment--top-right,
        .widget-grid-resize-adornment--bottom-left {
            cursor: nesw-resize;
        }

        .widget-grid-resize-adornment--top-left,
        .widget-grid-resize-adornment--bottom-left {
            left: -0.625rem;
        }

        .widget-grid-resize-adornment--top-right,
        .widget-grid-resize-adornment--bottom-right {
            right: -0.625rem;
        }

        .widget-grid-resize-adornment--top-left,
        .widget-grid-resize-adornment--top-right {
            top: -0.625rem;
            bottom: auto;
        }

        .widget-grid-resize-target {
            position: absolute;
            z-index: 15;
            inset: 0;
            display: grid;
            place-items: center;
            border: 3px dashed var(--mosaik-color-primary-500, #b4232b);
            border-radius: 0.5rem;
            color: var(--mosaik-color-primary-700, #8f1720);
            background: color-mix(in srgb, var(--mosaik-color-primary-500, #b4232b) 9%, transparent);
            pointer-events: none;
        }

        .widget-grid-resize-target span {
            padding: 0.375rem 0.625rem;
            border-radius: 999px;
            background: var(--mosaik-scheme-surface);
            box-shadow: var(--mosaik-elevation-2);
            font-weight: 600;
            font-variant-numeric: tabular-nums;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'widget-grid-item',
        '[attr.test-id]': "'widget-grid-item-' + item().id",
        '[attr.data-column-span]': 'columnSpan()',
        '[attr.data-row-span]': 'rowSpan()',
        '[style.--widget-grid-column-span]': 'columnSpan()',
        '[style.--widget-grid-column-span-md]': 'mediumColumnSpan()',
        '[style.--widget-grid-row-span]': 'rowSpan()',
        '[class.widget-grid-item--resizing]': 'resizePreview() !== null',
    },
})
export class WidgetGridItemComponent {
    // #region Fields

    private readonly _resizePreview = signal<IWidgetGridResizePreview | null>(null);

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /** Registry-derived item definition. */
    public readonly item = input.required<IWidgetGridItemDefinition>();

    /** Current persisted placement of the item. */
    public readonly layout = input.required<IWidgetGridItemLayout>();

    /** Owning feature's concrete widget template. */
    public readonly itemTemplate = input.required<TemplateRef<IWidgetGridItemTemplateContext>>();

    /** Resolved editor labels. */
    public readonly labels = input.required<IWidgetGridLabels>();

    /** Whether editing chrome is active. */
    public readonly editable = input(false);

    /** Whether the item can move one position earlier. */
    public readonly canMoveEarlier = input(false);

    /** Whether the item can move one position later. */
    public readonly canMoveLater = input(false);

    /** Whether the item can move to the preceding zone. */
    public readonly canMoveToPreviousZone = input(false);

    /** Whether the item can move to the following zone. */
    public readonly canMoveToNextZone = input(false);

    /** Requests a relative move inside the current zone. */
    public readonly moved = output<number>();

    /** Requests a move to a neighboring zone. */
    public readonly movedToZone = output<number>();

    /** Requests a persisted absolute size. */
    public readonly resized = output<IWidgetGridResizePreview>();

    /** Emits when a pointer resize starts or ends. */
    public readonly resizeActiveChange = output<boolean>();

    /** Requests removal from the visible canvas. */
    public readonly hidden = output<void>();

    /** Current live resize target. */
    protected readonly resizePreview: Signal<IWidgetGridResizePreview | null> = this._resizePreview.asReadonly();

    /** Logical column span, including an active resize preview. */
    protected readonly columnSpan: Signal<number> = computed(() => this._resizePreview()?.columnSpan ?? this.layout().columnSpan);

    /** Column span used by the two-column breakpoint. */
    protected readonly mediumColumnSpan: Signal<number> = computed(() => Math.min(2, this.columnSpan()));

    /** Logical row span, including an active resize preview. */
    protected readonly rowSpan: Signal<number> = computed(() => this._resizePreview()?.rowSpan ?? this.layout().rowSpan);

    /** Context passed to the feature-owned item template. */
    protected readonly itemTemplateContext: Signal<IWidgetGridItemTemplateContext> = computed(() => ({
        $implicit: this.item(),
        size: {
            columnSpan: this.columnSpan(),
            rowSpan: this.rowSpan(),
        },
    }));

    /** Configuration consumed by every directional resize handle. */
    protected readonly resizeConfiguration: Signal<IWidgetGridResizeConfiguration> = computed(() => ({
        columnSpan: this.layout().columnSpan,
        rowSpan: this.layout().rowSpan,
        minColumnSpan: this.item().columnSpan.min,
        maxColumnSpan: this.item().columnSpan.max,
        minRowSpan: this.item().rowSpan.min,
        maxRowSpan: this.item().rowSpan.max,
    }));

    // #endregion

    // #region Methods

    /** Applies or clears live resize feedback. */
    protected onResizePreview(preview: IWidgetGridResizePreview | null): void {
        const wasResizing = this._resizePreview() !== null;
        this._resizePreview.set(preview);
        if (wasResizing !== (preview !== null)) {
            this.resizeActiveChange.emit(preview !== null);
        }
    }

    /** Forwards a completed resize to the owning grid. */
    protected onResized(preview: IWidgetGridResizePreview): void {
        this.resized.emit(preview);
    }

    /** Whether the requested size change stays inside the contribution constraints. */
    protected canResize(columnDelta: number, rowDelta: number): boolean {
        const columnSpan = this.layout().columnSpan + columnDelta;
        const rowSpan = this.layout().rowSpan + rowDelta;

        return (
            columnSpan >= this.item().columnSpan.min &&
            columnSpan <= this.item().columnSpan.max &&
            rowSpan >= this.item().rowSpan.min &&
            rowSpan <= this.item().rowSpan.max
        );
    }

    /** Emits a keyboard/menu-driven size change as an absolute target. */
    protected resizeBy(columnDelta: number, rowDelta: number): void {
        if (!this.canResize(columnDelta, rowDelta)) {
            return;
        }

        this.resized.emit({
            columnSpan: this.layout().columnSpan + columnDelta,
            rowSpan: this.layout().rowSpan + rowDelta,
        });
    }

    // #endregion
}
