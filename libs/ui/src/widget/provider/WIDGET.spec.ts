// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { type Signal, signal, type Type } from '@angular/core';
import type { IWidget } from '../models/IWidget';
import type { IWidgetData } from '../models/IWidgetData';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetZone } from '../models/IWidgetZone';
import { WIDGET } from './WIDGET';

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

describe('WIDGET', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('collects one widget per contributing provider', () => {
        // Arrange
        const pipeline = fakeWidget('pipeline');
        const revenue = fakeWidget('revenue');
        TestBed.configureTestingModule({
            providers: [
                { provide: WIDGET, useValue: pipeline, multi: true },
                { provide: WIDGET, useValue: revenue, multi: true },
            ],
        });

        // Act
        const widgets = TestBed.inject(WIDGET);

        // Assert
        expect(widgets).toEqual([pipeline, revenue]);
    });

    it('is absent when no feature contributed a widget', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const widgets = TestBed.inject(WIDGET, null, { optional: true });

        // Assert
        expect(widgets).toBeNull();
    });
});
