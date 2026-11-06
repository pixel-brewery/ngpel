// #region Imports

import type { IWidget } from '../models/IWidget';
import type { IWidgetZone } from '../models/IWidgetZone';

// #endregion

/**
 * Derives the distinct zones the registered widgets ask for, ordered by the zone order and then by
 * zone id. There is no global zone inventory: a new widget contribution introduces its zone by
 * declaring it, and a zone disappears with the last widget that wanted it.
 *
 * The zones come back without display text, because ngpel resolves none — a host maps them onto
 * `IWidgetGridZoneDefinition` with its own resolved label and description.
 *
 * @public
 * @param widgets The registered widgets.
 * @returns The distinct zones, in the order they should be rendered.
 */
export function collectWidgetZones(widgets: ReadonlyArray<IWidget>): ReadonlyArray<IWidgetZone> {
    const zonesById = new Map<string, IWidgetZone>();

    for (const widget of [...widgets].sort((left, right): number => left.order - right.order || left.id.localeCompare(right.id))) {
        const zone = widget.layout.defaultZone;

        if (!zonesById.has(zone.id)) {
            zonesById.set(zone.id, zone);
        }
    }

    return [...zonesById.values()].sort((left, right): number => left.order - right.order || left.id.localeCompare(right.id));
}
