// #region Imports

import { inject, InjectionToken, type Signal, signal, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { IWidgetData } from '../models/IWidgetData';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetZone } from '../models/IWidgetZone';
import type { IWidget } from '../models/IWidget';
import { WIDGET } from './WIDGET';
import { WidgetFeatureKinds } from './WidgetFeatureKind';
import { withWidgetItems } from './withWidgetItems';

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

const WIDGET_TITLE = new InjectionToken<string>('WIDGET_TITLE');

describe('withWidgetItems', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('contributes one widget provider per factory, under the item kind', () => {
        // Arrange
        const feature = withWidgetItems({ id: 'reporting', widgets: [(): IWidget => fakeWidget('pipeline'), (): IWidget => fakeWidget('revenue')] });

        // Act
        const providers = feature.provide();

        // Assert
        expect(feature.kind).toBe(WidgetFeatureKinds.Item);
        expect(providers).toHaveLength(2);
    });

    it('runs every factory inside the injection context of the composition root', () => {
        // Arrange
        const feature = withWidgetItems({
            id: 'reporting',
            widgets: [(): IWidget => fakeWidget('pipeline', { title: inject(WIDGET_TITLE) })],
        });
        TestBed.configureTestingModule({ providers: [{ provide: WIDGET_TITLE, useValue: 'Resolved' }, ...feature.provide()] });

        // Act
        const widgets = TestBed.inject(WIDGET);

        // Assert
        expect(widgets[0]?.title()).toBe('Resolved');
    });

    it('contributes nothing for a contribution without widgets', () => {
        // Arrange
        const feature = withWidgetItems({ id: 'reporting', widgets: [] });

        // Act
        const providers = feature.provide();

        // Assert
        expect(providers).toEqual([]);
    });
});
