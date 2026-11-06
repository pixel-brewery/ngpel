// #region Imports

import { type Signal, signal, type Type } from '@angular/core';
import { describe, expect, it } from 'vitest';
import type { IWidget } from '../models/IWidget';
import type { IWidgetData } from '../models/IWidgetData';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetZone } from '../models/IWidgetZone';
import { toWidgetGridItemDefinition } from './toWidgetGridItemDefinition';

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

describe('toWidgetGridItemDefinition', () => {
    it('projects a widget onto the item contract with its text resolved', () => {
        // Arrange
        const widget = fakeWidget('pipeline', {
            order: 10,
            title: 'Pipeline',
            subTitle: 'Deals in flight',
            zone: { id: 'operations', iconName: 'board', order: 0 },
        });

        // Act
        const result = toWidgetGridItemDefinition(widget);

        // Assert
        expect(result).toEqual({
            id: 'pipeline',
            title: 'Pipeline',
            description: 'Deals in flight',
            iconName: 'board',
            defaultZoneId: 'operations',
            order: 10,
            enabledByDefault: true,
            columnSpan: { default: 3, min: 1, max: 6 },
            rowSpan: { default: 2, min: 1, max: 4 },
        });
    });

    it('reads the current value of a title that is still being translated', () => {
        // Arrange
        const title = signal('widgets.pipeline.title');
        const widget = fakeWidget('pipeline', { title });
        title.set('Pipeline');

        // Act
        const result = toWidgetGridItemDefinition(widget);

        // Assert
        expect(result.title).toBe('Pipeline');
    });

    it('omits the description for a widget without a subtitle', () => {
        // Arrange
        const widget = fakeWidget('pipeline');

        // Act
        const result = toWidgetGridItemDefinition(widget);

        // Assert
        expect(result.description).toBeUndefined();
    });
});
