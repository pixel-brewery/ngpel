// #region Imports

import { describe, expect, it } from 'vitest';
import { type Signal, signal, type Type } from '@angular/core';
import type { IWidget } from '../models/IWidget';
import type { IWidgetData } from '../models/IWidgetData';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetZone } from '../models/IWidgetZone';
import { collectWidgetZones } from './collectWidgetZones';

// #endregion

/** Optional overrides for {@link fakeWidget}. */
interface IFakeWidgetOptions {
    readonly order?: number;
    readonly title?: string | Signal<string>;
    readonly subTitle?: string;
    readonly zone?: IWidgetZone;
    readonly enabledByDefault?: boolean;
    readonly columnSpan?: IWidgetSpanRange;
    readonly rowSpan?: IWidgetSpanRange;
    readonly canActivate?: () => boolean;
    readonly data?: IWidgetData;
}

/** The component a faked widget lazily loads. */
class FakeWidgetView {}

/** Builds a widget; the title defaults to the id and the widget lands enabled in an `operations` zone. */
function fakeWidget(id: string, options: IFakeWidgetOptions = {}): IWidget {
    return {
        id,
        order: options.order ?? 0,
        title: typeof options.title === 'function' ? options.title : signal(options.title ?? id),
        subTitle: options.subTitle === undefined ? undefined : signal(options.subTitle),
        layout: {
            defaultZone: options.zone ?? { id: 'operations', iconName: 'board', order: 0 },
            enabledByDefault: options.enabledByDefault ?? true,
            columnSpan: options.columnSpan ?? { default: 3, min: 1, max: 6 },
            rowSpan: options.rowSpan ?? { default: 2, min: 1, max: 4 },
        },
        views: { front: (): Promise<Type<unknown>> => Promise.resolve(FakeWidgetView) },
        canActivate: options.canActivate,
        data: options.data,
    };
}

describe('collectWidgetZones', () => {
    it('derives the distinct zones the widgets ask for, in zone order', () => {
        // Arrange
        const widgets = [
            fakeWidget('revenue-report', { order: 0, zone: { id: 'revenue', iconName: 'textPercent', order: 1 } }),
            fakeWidget('pipeline', { order: 1, zone: { id: 'operations', iconName: 'board', order: 0 } }),
            fakeWidget('forecast', { order: 2, zone: { id: 'revenue', iconName: 'textPercent', order: 1 } }),
        ];

        // Act
        const result = collectWidgetZones(widgets);

        // Assert
        expect(result).toEqual([
            { id: 'operations', iconName: 'board', order: 0 },
            { id: 'revenue', iconName: 'textPercent', order: 1 },
        ]);
    });

    it('returns nothing when no widget is registered', () => {
        // Act
        const result = collectWidgetZones([]);

        // Assert
        expect(result).toEqual([]);
    });
});
