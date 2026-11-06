// #region Imports

import type { IWidgetGridItemLayout } from '../IWidgetGridItemLayout';
import { compareItemLayoutOrder } from './compareItemLayoutOrder';

// #endregion

/**
 * Renumbers the placements of every zone to a gap-free sequence, so a persisted layout never
 * accumulates the holes that repeated moves and reconciliations would otherwise leave behind.
 *
 * @param items The placements to renumber.
 * @returns The renumbered placements.
 */
export function normalizeWidgetGridItemOrders(items: ReadonlyArray<IWidgetGridItemLayout>): ReadonlyArray<IWidgetGridItemLayout> {
    const itemsById = new Map(items.map((item): [string, IWidgetGridItemLayout] => [item.widgetId, item]));
    const zoneIds = new Set(items.map((item): string => item.zoneId));

    for (const zoneId of zoneIds) {
        [...itemsById.values()]
            .filter((item): boolean => item.zoneId === zoneId)
            .sort(compareItemLayoutOrder)
            .forEach((item, order): void => {
                itemsById.set(item.widgetId, { ...item, order });
            });
    }

    return [...itemsById.values()];
}
