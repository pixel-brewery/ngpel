// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { type Signal, signal, type Type } from '@angular/core';
import type { IWidgetData } from '../models/IWidgetData';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetZone } from '../models/IWidgetZone';
import type { IWidget } from '../models/IWidget';
import { WidgetManager } from '../services/WidgetManager';
import { WidgetRegistry } from '../services/WidgetRegistry';
import { provideWidget } from './provideWidget';
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

describe('provideWidget', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('composes contributed features into a registry the manager resolves', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [
                provideWidget(
                    withWidgetItems({ id: 'reporting', widgets: [(): IWidget => fakeWidget('revenue', { order: 10 })] }),
                    withWidgetItems({ id: 'people', widgets: [(): IWidget => fakeWidget('people', { order: 0 })] }),
                ),
            ],
        });

        // Act
        const manager = TestBed.inject(WidgetManager);

        // Assert
        expect(manager.widgets().map((widget): string => widget.id)).toEqual(['people', 'revenue']);
        expect(TestBed.inject(WidgetRegistry).all()).toHaveLength(2);
    });

    it('provides an empty registry when no feature is composed', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideWidget()] });

        // Act
        const manager = TestBed.inject(WidgetManager);

        // Assert
        expect(manager.allWidgets()).toEqual([]);
    });

    it('rejects two contributions with the same feature id', () => {
        // Arrange
        const first = withWidgetItems({ id: 'reporting', widgets: [(): IWidget => fakeWidget('revenue')] });
        const second = withWidgetItems({ id: 'reporting', widgets: [(): IWidget => fakeWidget('pipeline')] });

        // Act
        const compose = (): unknown => provideWidget(first, second);

        // Assert
        expect(compose).toThrow("Feature conflict: duplicate id 'reporting' within kind 'widget-item'.");
    });
});
