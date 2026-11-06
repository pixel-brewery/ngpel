// #region Imports

import { describe, expect, it } from 'vitest';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import { WIDGET_GRID_LAYOUT_CODEC } from './WIDGET_GRID_LAYOUT_CODEC';
import { WIDGET_GRID_LAYOUT_VERSION } from './WIDGET_GRID_LAYOUT_VERSION';

// #endregion

describe('WIDGET_GRID_LAYOUT_CODEC', () => {
    const layout: IWidgetGridLayout = {
        version: WIDGET_GRID_LAYOUT_VERSION,
        zones: [{ zoneId: 'operations', order: 0 }],
        items: [{ widgetId: 'pipeline', zoneId: 'operations', order: 0, columnSpan: 3, rowSpan: 2, enabled: true }],
    };

    it('accepts a payload of the current version unchanged', () => {
        // Act
        const result = WIDGET_GRID_LAYOUT_CODEC.parse(WIDGET_GRID_LAYOUT_CODEC.serialize(layout));

        // Assert
        expect(result).toEqual(layout);
    });

    it('migrates a four-column layout proportionally to the six-column grid', () => {
        // Arrange
        const legacy = {
            version: 1,
            zones: [{ zoneId: 'operations', order: 0 }],
            items: [1, 2, 3, 4].map((columnSpan, order) => ({
                widgetId: `widget-${columnSpan}`,
                zoneId: 'operations',
                order,
                columnSpan,
                rowSpan: 2,
                enabled: true,
            })),
        };

        // Act
        const result = WIDGET_GRID_LAYOUT_CODEC.parse(legacy);

        // Assert
        expect(result?.version).toBe(WIDGET_GRID_LAYOUT_VERSION);
        expect(result?.items.map((item): number => item.columnSpan)).toEqual([2, 3, 5, 6]);
    });

    it('rejects a malformed payload instead of applying it in part', () => {
        // Act
        const result = WIDGET_GRID_LAYOUT_CODEC.parse({
            version: WIDGET_GRID_LAYOUT_VERSION,
            zones: [{ zoneId: 'operations', order: -1 }],
            items: [],
        });

        // Assert
        expect(result).toBeUndefined();
    });

    it('rejects a payload of an unsupported version', () => {
        // Act
        const result = WIDGET_GRID_LAYOUT_CODEC.parse({ version: 99, zones: [], items: [] });

        // Assert
        expect(result).toBeUndefined();
    });

    it('rejects a payload that is not an object at all', () => {
        // Act
        const result = WIDGET_GRID_LAYOUT_CODEC.parse('{}');

        // Assert
        expect(result).toBeUndefined();
    });
});
