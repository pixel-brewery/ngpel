// #region Imports

import type { IWidgetGridItemLayout } from './IWidgetGridItemLayout';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import { clamp } from './internal/clamp';
import { compareItemLayoutOrder } from './internal/compareItemLayoutOrder';

// #endregion

/**
 * Moves one widget into a zone at a position and renumbers both the zone it left and the zone it
 * joined. Dropping a widget always shows it, which is what makes dragging one out of the toolbox
 * the same gesture as moving one between zones.
 *
 * @public
 * @param layout The current layout.
 * @param widgetId The id of the widget to move.
 * @param targetZoneId The id of the zone the widget is moved into.
 * @param targetIndex The position within the target zone, clamped into range.
 * @returns The layout with the widget moved, or the unchanged layout when the widget or the zone is
 * unknown.
 */
export function moveWidgetGridItem(layout: IWidgetGridLayout, widgetId: string, targetZoneId: string, targetIndex: number): IWidgetGridLayout {
    const movingItem = layout.items.find((item): boolean => item.widgetId === widgetId);

    if (movingItem === undefined || !layout.zones.some((zone): boolean => zone.zoneId === targetZoneId)) {
        return layout;
    }

    const targetItems = layout.items
        .filter((item): boolean => item.enabled && item.zoneId === targetZoneId && item.widgetId !== widgetId)
        .sort(compareItemLayoutOrder);
    const movedItem: IWidgetGridItemLayout = { ...movingItem, zoneId: targetZoneId, enabled: true };
    targetItems.splice(clamp(targetIndex, 0, targetItems.length), 0, movedItem);

    const itemsById = new Map(layout.items.map((item): [string, IWidgetGridItemLayout] => [item.widgetId, item]));
    itemsById.set(widgetId, movedItem);

    for (const zoneId of new Set([movingItem.zoneId, targetZoneId])) {
        const orderedItems =
            zoneId === targetZoneId
                ? targetItems
                : [...itemsById.values()]
                      .filter((item): boolean => item.enabled && item.zoneId === zoneId && item.widgetId !== widgetId)
                      .sort(compareItemLayoutOrder);

        orderedItems.forEach((item, order): void => {
            itemsById.set(item.widgetId, { ...item, order });
        });
    }

    return {
        ...layout,
        items: [...itemsById.values()],
    };
}
