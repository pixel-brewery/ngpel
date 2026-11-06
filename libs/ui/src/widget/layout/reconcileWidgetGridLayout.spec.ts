// #region Imports

import { describe, expect, it } from 'vitest';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import type { IWidgetGridZoneDefinition } from './IWidgetGridZoneDefinition';
import { reconcileWidgetGridLayout } from './reconcileWidgetGridLayout';
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

describe('reconcileWidgetGridLayout', () => {
    const zones: ReadonlyArray<IWidgetGridZoneDefinition> = [fakeWidgetGridZoneDefinition('operations', 0), fakeWidgetGridZoneDefinition('revenue', 1)];
    const items: ReadonlyArray<IWidgetGridItemDefinition> = [
        fakeWidgetGridItemDefinition('pipeline', 'operations', 0),
        fakeWidgetGridItemDefinition('revenue-report', 'revenue', 0),
    ];

    it('keeps a valid user layout while adding newly registered widgets from their defaults', () => {
        // Arrange
        const stored: IWidgetGridLayout = {
            version: WIDGET_GRID_LAYOUT_VERSION,
            zones: [
                { zoneId: 'revenue', order: 0 },
                { zoneId: 'operations', order: 1 },
            ],
            items: [{ widgetId: 'pipeline', zoneId: 'revenue', order: 0, columnSpan: 1, rowSpan: 2, enabled: false }],
        };

        // Act
        const result = reconcileWidgetGridLayout(stored, zones, items);

        // Assert
        expect(result.zones.map((zone): string => zone.zoneId)).toEqual(['revenue', 'operations']);
        expect(result.items.find((item): boolean => item.widgetId === 'pipeline')).toMatchObject({ zoneId: 'revenue', enabled: false });
        expect(result.items.find((item): boolean => item.widgetId === 'revenue-report')).toMatchObject({ zoneId: 'revenue', enabled: true });
    });

    it('retains a placement whose widget is temporarily unavailable', () => {
        // Arrange
        const stored = reconcileWidgetGridLayout(undefined, zones, items);
        const [pipeline] = items;

        // Act
        const result = reconcileWidgetGridLayout(stored, zones, pipeline === undefined ? [] : [pipeline]);

        // Assert
        expect(result.items.some((item): boolean => item.widgetId === 'revenue-report')).toBe(true);
    });

    it('clamps a stored span that the widget no longer supports', () => {
        // Arrange
        const stored: IWidgetGridLayout = {
            version: WIDGET_GRID_LAYOUT_VERSION,
            zones: [{ zoneId: 'operations', order: 0 }],
            items: [{ widgetId: 'pipeline', zoneId: 'operations', order: 0, columnSpan: 6, rowSpan: 4, enabled: true }],
        };
        const shrunkItems = [fakeWidgetGridItemDefinition('pipeline', 'operations', 0, { columnSpan: { default: 2, min: 1, max: 2 } })];

        // Act
        const result = reconcileWidgetGridLayout(stored, zones, shrunkItems);

        // Assert
        expect(result.items.find((item): boolean => item.widgetId === 'pipeline')?.columnSpan).toBe(2);
    });

    it('falls back to the first zone when a widget asks for a zone that does not exist', () => {
        // Arrange
        const orphaned = [fakeWidgetGridItemDefinition('pipeline', 'archive', 0)];

        // Act
        const result = reconcileWidgetGridLayout(undefined, zones, orphaned);

        // Assert
        expect(result.items.find((item): boolean => item.widgetId === 'pipeline')?.zoneId).toBe('operations');
    });
});
