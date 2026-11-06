// #region Imports

import { describe, expect, it } from 'vitest';
import type { IWidgetGridItemDefinition } from './IWidgetGridItemDefinition';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetGridZoneDefinition } from './IWidgetGridZoneDefinition';
import { createDefaultWidgetGridLayout } from './createDefaultWidgetGridLayout';
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

describe('setWidgetGridItemEnabled', () => {
    const layout = createDefaultWidgetGridLayout([fakeWidgetGridZoneDefinition('operations', 0)], [fakeWidgetGridItemDefinition('pipeline', 'operations', 0)]);

    it('hides a widget while retaining its placement', () => {
        // Act
        const result = setWidgetGridItemEnabled(layout, 'pipeline', false);

        // Assert
        expect(result.items).toEqual([{ widgetId: 'pipeline', zoneId: 'operations', order: 0, columnSpan: 3, rowSpan: 2, enabled: false }]);
    });

    it('leaves every placement untouched for a widget it does not know', () => {
        // Act
        const result = setWidgetGridItemEnabled(layout, 'unknown', false);

        // Assert
        expect(result.items).toEqual(layout.items);
    });
});
