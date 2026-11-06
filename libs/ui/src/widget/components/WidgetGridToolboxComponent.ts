// #region Imports

import { ChangeDetectionStrategy, Component, computed, input, output, type Signal } from '@angular/core';
import {
    AvatarComponent,
    ButtonComponent,
    IconNameDirective,
    TextComponent,
    ToggleTipComponent,
    TooltipDirective,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IWidgetGridItemDefinition } from '../layout/IWidgetGridItemDefinition';
import type { IWidgetGridLabels } from '../models/IWidgetGridLabels';
import type { IWidgetGridLayout } from '../layout/IWidgetGridLayout';
import type { IWidgetGridZoneDefinition } from '../layout/IWidgetGridZoneDefinition';

// #endregion

interface IWidgetGridToolboxGroup {
    // #region Properties

    readonly zone: IWidgetGridZoneDefinition;
    readonly items: ReadonlyArray<IWidgetGridItemDefinition>;

    // #endregion
}

/**
 * Renders the available widget selection independently from its owning surface.
 *
 * @public
 */
@Component({
    selector: 'ngp-widget-grid-toolbox',
    host: { class: 'block h-full min-h-0 min-w-0' },
    imports: [AvatarComponent, ButtonComponent, IconNameDirective, TextComponent, ToggleTipComponent, TooltipDirective],
    template: `
        <div class="box-border flex h-full min-h-0 min-w-0 flex-col gap-4 overflow-y-auto overscroll-contain p-3" [attr.test-id]="'widget-grid-toolbox'">
            @for (group of groups(); track group.zone.id) {
                <section class="flex min-w-0 flex-col gap-2">
                    <div class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 py-1">
                        <mosaik-avatar [size]="'small'" [appearance]="'soft'" [iconName]="group.zone.iconName" />
                        <div class="flex min-w-0 flex-col">
                            <mosaik-text [text]="group.zone.label" [wrap]="true" />
                            <mosaik-text [text]="group.zone.description" [wrap]="true" [readonly]="true" />
                        </div>
                    </div>
                    <div class="flex min-w-0 flex-col gap-2 px-1">
                        @for (item of group.items; track item.id) {
                            <div class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 p-1">
                                <mosaik-avatar [size]="'small'" [appearance]="'soft'" [iconName]="item.iconName ?? 'board'" />
                                <div class="flex min-w-0 flex-col">
                                    <mosaik-text [text]="item.title" [wrap]="true" />
                                    @if (item.description) {
                                        <mosaik-text [text]="item.description" [wrap]="true" [readonly]="true" />
                                    }
                                </div>
                                <mosaik-toggletip
                                    [content]="itemSizeConstraints(item)"
                                    [placement]="'left'"
                                    [attr.test-id]="'widget-grid-item-size-constraints-' + item.id"
                                ></mosaik-toggletip>
                                <mosaik-button
                                    [appearance]="isItemEnabled(item.id) ? 'plain' : 'solid'"
                                    [variant]="'primary'"
                                    [iconName]="isItemEnabled(item.id) ? 'eyeOff' : 'eye'"
                                    [mosaikTooltip]="isItemEnabled(item.id) ? labels().hide : labels().show"
                                    [attr.test-id]="'widget-grid-item-toggle-' + item.id"
                                    (click)="itemToggled.emit(item)"
                                />
                            </div>
                        }
                    </div>
                </section>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetGridToolboxComponent {
    // #region Fields
    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    public readonly zones = input.required<ReadonlyArray<IWidgetGridZoneDefinition>>();
    public readonly items = input.required<ReadonlyArray<IWidgetGridItemDefinition>>();
    public readonly layout = input.required<IWidgetGridLayout>();
    public readonly labels = input.required<IWidgetGridLabels>();
    public readonly itemToggled = output<IWidgetGridItemDefinition>();

    protected readonly groups: Signal<ReadonlyArray<IWidgetGridToolboxGroup>> = computed(() => {
        const layout = this.layout();
        const placementsByWidgetId = new Map(layout.items.map((item) => [item.widgetId, item]));
        const zoneOrderById = new Map(layout.zones.map((zone) => [zone.zoneId, zone.order]));

        return [...this.zones()]
            .sort(
                (left, right) =>
                    (zoneOrderById.get(left.id) ?? left.order) - (zoneOrderById.get(right.id) ?? right.order) || left.label.localeCompare(right.label),
            )
            .map((zone): IWidgetGridToolboxGroup => ({
                zone,
                items: [...this.items()]
                    .filter((item) => (placementsByWidgetId.get(item.id)?.zoneId ?? item.defaultZoneId) === zone.id)
                    .sort((left, right) => {
                        const leftOrder = placementsByWidgetId.get(left.id)?.order ?? left.order;
                        const rightOrder = placementsByWidgetId.get(right.id)?.order ?? right.order;

                        return leftOrder - rightOrder || left.title.localeCompare(right.title);
                    }),
            }))
            .filter((group) => group.items.length > 0);
    });

    // #endregion

    // #region Methods

    protected isItemEnabled(itemId: string): boolean {
        return this.layout().items.find((item) => item.widgetId === itemId)?.enabled === true;
    }

    protected itemSizeConstraints(item: IWidgetGridItemDefinition): string {
        return `${this.labels().sizeConstraints}: ${this.labels().minimumSize} ${item.columnSpan.min} × ${item.rowSpan.min}, ${this.labels().maximumSize} ${item.columnSpan.max} × ${item.rowSpan.max}`;
    }

    // #endregion
}
