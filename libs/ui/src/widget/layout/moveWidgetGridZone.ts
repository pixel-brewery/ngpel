// #region Imports

import type { IWidgetGridLayout } from './IWidgetGridLayout';
import type { IWidgetGridZoneLayout } from './IWidgetGridZoneLayout';
import { clamp } from './internal/clamp';

// #endregion

/**
 * Moves one zone to another position and renumbers the zone order.
 *
 * Both indices are clamped into range, so a drag that ends outside the list drops the zone at the
 * nearest valid position instead of losing it.
 *
 * @public
 * @param layout The current layout.
 * @param previousIndex The current position of the zone.
 * @param currentIndex The position the zone is moved to.
 * @returns The layout with the zone moved, or the unchanged layout when there is no zone to move.
 */
export function moveWidgetGridZone(layout: IWidgetGridLayout, previousIndex: number, currentIndex: number): IWidgetGridLayout {
    const zones = [...layout.zones];
    const from = clamp(previousIndex, 0, Math.max(0, zones.length - 1));
    const to = clamp(currentIndex, 0, Math.max(0, zones.length - 1));
    const [zone] = zones.splice(from, 1);

    if (zone === undefined) {
        return layout;
    }

    zones.splice(to, 0, zone);

    return {
        ...layout,
        zones: zones.map((item, order): IWidgetGridZoneLayout => ({ ...item, order })),
    };
}
