// #region Imports

import { describe, expect, it } from 'vitest';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import { moveWidgetGridZone } from './moveWidgetGridZone';
import { WIDGET_GRID_LAYOUT_VERSION } from './WIDGET_GRID_LAYOUT_VERSION';

// #endregion

describe('moveWidgetGridZone', () => {
    const layout: IWidgetGridLayout = {
        version: WIDGET_GRID_LAYOUT_VERSION,
        zones: [
            { zoneId: 'operations', order: 0 },
            { zoneId: 'revenue', order: 1 },
            { zoneId: 'people', order: 2 },
        ],
        items: [],
    };

    it('moves a zone and renumbers the zone order without gaps', () => {
        // Act
        const result = moveWidgetGridZone(layout, 2, 0);

        // Assert
        expect(result.zones).toEqual([
            { zoneId: 'people', order: 0 },
            { zoneId: 'operations', order: 1 },
            { zoneId: 'revenue', order: 2 },
        ]);
    });

    it('clamps a drop position that ends outside the list', () => {
        // Act
        const result = moveWidgetGridZone(layout, 0, 99);

        // Assert
        expect(result.zones.map((zone): string => zone.zoneId)).toEqual(['revenue', 'people', 'operations']);
    });

    it('returns the layout unchanged when there is no zone to move', () => {
        // Arrange
        const empty: IWidgetGridLayout = { ...layout, zones: [] };

        // Act
        const result = moveWidgetGridZone(empty, 0, 0);

        // Assert
        expect(result).toBe(empty);
    });
});
