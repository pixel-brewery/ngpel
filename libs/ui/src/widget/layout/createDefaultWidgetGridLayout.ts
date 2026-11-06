// #region Imports

import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import type { IWidgetGridZoneDefinition } from './IWidgetGridZoneDefinition';
import { reconcileWidgetGridLayout } from './reconcileWidgetGridLayout';

// #endregion

/**
 * Creates the layout a user starts with, purely from what the zones and items contribute.
 *
 * @public
 * @param zones The zones that currently exist.
 * @param items The items that are currently available.
 * @returns The initial layout.
 */
export function createDefaultWidgetGridLayout(
    zones: ReadonlyArray<IWidgetGridZoneDefinition>,
    items: ReadonlyArray<IWidgetGridItemDefinition>,
): IWidgetGridLayout {
    return reconcileWidgetGridLayout(undefined, zones, items);
}
