// #region Imports

import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetGridItemLayout } from './IWidgetGridItemLayout';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import type { IWidgetGridZoneDefinition } from './IWidgetGridZoneDefinition';
import type { IWidgetGridZoneLayout } from './IWidgetGridZoneLayout';
import { clamp } from './internal/clamp';
import { compareDefinitionOrder } from './internal/compareDefinitionOrder';
import { compareZoneLayoutOrder } from './internal/compareZoneLayoutOrder';
import { normalizeWidgetGridItemOrders } from './internal/normalizeWidgetGridItemOrders';
import { uniqueById } from './internal/uniqueById';
import { WIDGET_GRID_LAYOUT_VERSION } from './WIDGET_GRID_LAYOUT_VERSION';

// #endregion

/**
 * Reconciles a stored layout with the zones and items that currently exist.
 *
 * Two properties make this safe to run on every dashboard load. A placement whose widget is
 * momentarily unavailable — a permission that has not loaded yet, a licence being renewed — is
 * retained instead of dropped, so a temporary outage never destroys a user's arrangement. And every
 * stored span is clamped to the constraints the widget declares today, so a widget that shrank its
 * maximum size cannot be rendered at a size it no longer supports.
 *
 * @public
 * @param stored The persisted layout, or `undefined` for a user who has none yet.
 * @param zones The zones that currently exist.
 * @param items The items that are currently available.
 * @returns The reconciled layout.
 */
export function reconcileWidgetGridLayout(
    stored: IWidgetGridLayout | undefined,
    zones: ReadonlyArray<IWidgetGridZoneDefinition>,
    items: ReadonlyArray<IWidgetGridItemDefinition>,
): IWidgetGridLayout {
    const uniqueZones = uniqueById(zones);
    const validZoneIds = new Set(uniqueZones.map((zone): string => zone.id));
    const fallbackZoneId = [...uniqueZones].sort(compareDefinitionOrder)[0]?.id ?? '';
    const storedZones = new Map(stored?.zones.map((zone): [string, IWidgetGridZoneLayout] => [zone.zoneId, zone]) ?? []);
    const nextZones = uniqueZones
        .map((zone): IWidgetGridZoneLayout => ({ zoneId: zone.id, order: storedZones.get(zone.id)?.order ?? zone.order }))
        .sort(compareZoneLayoutOrder)
        .map((zone, order): IWidgetGridZoneLayout => ({ ...zone, order }));

    const uniqueItems = uniqueById(items);
    const availableItemIds = new Set(uniqueItems.map((item): string => item.id));
    const storedItems = new Map(stored?.items.map((item): [string, IWidgetGridItemLayout] => [item.widgetId, item]) ?? []);
    const nextAvailableItems = uniqueItems.map((item): IWidgetGridItemLayout => {
        const preference = storedItems.get(item.id);
        const defaultZoneId = validZoneIds.has(item.defaultZoneId) ? item.defaultZoneId : fallbackZoneId;
        const zoneId = preference !== undefined && validZoneIds.has(preference.zoneId) ? preference.zoneId : defaultZoneId;

        return {
            widgetId: item.id,
            zoneId,
            order: preference?.order ?? item.order,
            columnSpan: clamp(preference?.columnSpan ?? item.columnSpan.default, item.columnSpan.min, item.columnSpan.max),
            rowSpan: clamp(preference?.rowSpan ?? item.rowSpan.default, item.rowSpan.min, item.rowSpan.max),
            enabled: preference?.enabled ?? item.enabledByDefault,
        };
    });
    const retainedUnavailableItems = stored?.items.filter((item): boolean => !availableItemIds.has(item.widgetId)) ?? [];

    return {
        version: WIDGET_GRID_LAYOUT_VERSION,
        zones: nextZones,
        items: normalizeWidgetGridItemOrders([...nextAvailableItems, ...retainedUnavailableItems]),
    };
}
