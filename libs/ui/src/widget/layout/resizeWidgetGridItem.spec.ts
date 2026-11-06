// #region Imports

import { describe, expect, it } from 'vitest';
import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetGridZoneDefinition } from './IWidgetGridZoneDefinition';
import { createDefaultWidgetGridLayout } from './createDefaultWidgetGridLayout';
import { resizeWidgetGridItem } from './resizeWidgetGridItem';
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

describe('resizeWidgetGridItem', () => {
    const pipeline = fakeWidgetGridItemDefinition('pipeline', 'operations', 0);
    const layout = createDefaultWidgetGridLayout([fakeWidgetGridZoneDefinition('operations', 0)], [pipeline]);

    it('clamps an over-long resize gesture to the widget constraints and keeps the placement', () => {
        // Arrange
        const hidden = setWidgetGridItemEnabled(layout, 'pipeline', false);

        // Act
        const result = resizeWidgetGridItem(hidden, pipeline, 20, -20);

        // Assert
        expect(result.items).toEqual([{ widgetId: 'pipeline', zoneId: 'operations', order: 0, columnSpan: 6, rowSpan: 1, enabled: false }]);
    });

    it('leaves every placement untouched for a widget that has none', () => {
        // Arrange
        const unplaced = fakeWidgetGridItemDefinition('unknown', 'operations', 0);

        // Act
        const result = resizeWidgetGridItem(layout, unplaced, 1, 1);

        // Assert
        expect(result.items).toEqual(layout.items);
    });
});
