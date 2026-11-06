// #region Imports

import { describe, expect, it } from 'vitest';
import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetGridZoneDefinition } from './IWidgetGridZoneDefinition';
import { createDefaultWidgetGridLayout } from './createDefaultWidgetGridLayout';
import { WIDGET_GRID_LAYOUT_VERSION } from './WIDGET_GRID_LAYOUT_VERSION';

// #endregion

/** Optional overrides for {@link fakeWidgetGridItemDefinition}. */
interface IFakeWidgetGridItemDefinitionOptions {
    readonly title?: string;
    readonly enabledByDefault?: boolean;
    readonly columnSpan?: IWidgetSpanRange;
    readonly rowSpan?: IWidgetSpanRange;
}

/** Builds a widget-grid item definition. */
function fakeWidgetGridItemDefinition(
    id: string,
    defaultZoneId: string,
    order: number,
    options: IFakeWidgetGridItemDefinitionOptions = {},
): IWidgetGridItemDefinition {
    return {
        id,
        title: options.title ?? id,
        defaultZoneId,
        order,
        enabledByDefault: options.enabledByDefault ?? true,
        columnSpan: options.columnSpan ?? { default: 3, min: 1, max: 6 },
        rowSpan: options.rowSpan ?? { default: 2, min: 1, max: 4 },
    };
}

/** Optional overrides for {@link fakeWidgetGridZoneDefinition}. */
interface IFakeWidgetGridZoneDefinitionOptions {
    readonly iconName?: string;
    readonly label?: string;
    readonly description?: string;
}

/** Builds a widget-grid zone definition. */
function fakeWidgetGridZoneDefinition(id: string, order: number, options: IFakeWidgetGridZoneDefinitionOptions = {}): IWidgetGridZoneDefinition {
    return {
        id,
        iconName: options.iconName ?? 'board',
        label: options.label ?? id,
        description: options.description ?? id,
        order,
    };
}

describe('createDefaultWidgetGridLayout', () => {
    it('places every item in the zone it asks for, at its contributed span', () => {
        // Arrange
        const zones = [fakeWidgetGridZoneDefinition('operations', 0), fakeWidgetGridZoneDefinition('revenue', 1)];
        const items = [fakeWidgetGridItemDefinition('pipeline', 'operations', 0), fakeWidgetGridItemDefinition('revenue-report', 'revenue', 0)];

        // Act
        const result = createDefaultWidgetGridLayout(zones, items);

        // Assert
        expect(result.version).toBe(WIDGET_GRID_LAYOUT_VERSION);
        expect(result.items).toEqual([
            { widgetId: 'pipeline', zoneId: 'operations', order: 0, columnSpan: 3, rowSpan: 2, enabled: true },
            { widgetId: 'revenue-report', zoneId: 'revenue', order: 0, columnSpan: 3, rowSpan: 2, enabled: true },
        ]);
    });

    it('hides an item that does not want to be visible before the user customizes the grid', () => {
        // Arrange
        const zones = [fakeWidgetGridZoneDefinition('operations', 0)];
        const items = [fakeWidgetGridItemDefinition('pipeline', 'operations', 0, { enabledByDefault: false })];

        // Act
        const result = createDefaultWidgetGridLayout(zones, items);

        // Assert
        expect(result.items.find((item): boolean => item.widgetId === 'pipeline')?.enabled).toBe(false);
    });
});
