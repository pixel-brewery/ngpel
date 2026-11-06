// #region Imports

import { describe, expect, it } from 'vitest';
import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetGridZoneDefinition } from './IWidgetGridZoneDefinition';
import { createDefaultWidgetGridLayout } from './createDefaultWidgetGridLayout';
import type { IWidgetGridLayout } from './IWidgetGridLayout';
import { moveWidgetGridItem } from './moveWidgetGridItem';
import { setWidgetGridItemEnabled } from './setWidgetGridItemEnabled';

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

describe('moveWidgetGridItem', () => {
    const zones = [fakeWidgetGridZoneDefinition('operations', 0), fakeWidgetGridZoneDefinition('revenue', 1)];
    const items = [fakeWidgetGridItemDefinition('pipeline', 'operations', 0), fakeWidgetGridItemDefinition('revenue-report', 'revenue', 0)];
    const layout: IWidgetGridLayout = createDefaultWidgetGridLayout(zones, items);

    it('moves a widget across zones and keeps one normalized order per target zone', () => {
        // Act
        const result = moveWidgetGridItem(layout, 'pipeline', 'revenue', 1);

        // Assert
        expect(
            result.items
                .filter((item): boolean => item.zoneId === 'revenue' && item.enabled)
                .sort((left, right): number => left.order - right.order)
                .map((item): string => item.widgetId),
        ).toEqual(['revenue-report', 'pipeline']);
    });

    it('shows a hidden widget that is dropped into a zone', () => {
        // Arrange
        const hidden = setWidgetGridItemEnabled(layout, 'pipeline', false);

        // Act
        const result = moveWidgetGridItem(hidden, 'pipeline', 'revenue', 0);

        // Assert
        expect(result.items.find((item): boolean => item.widgetId === 'pipeline')).toMatchObject({ zoneId: 'revenue', order: 0, enabled: true });
    });

    it('returns the layout unchanged for a widget it does not know', () => {
        // Act
        const result = moveWidgetGridItem(layout, 'unknown', 'revenue', 0);

        // Assert
        expect(result).toBe(layout);
    });

    it('returns the layout unchanged for a zone it does not know', () => {
        // Act
        const result = moveWidgetGridItem(layout, 'pipeline', 'archive', 0);

        // Assert
        expect(result).toBe(layout);
    });
});
