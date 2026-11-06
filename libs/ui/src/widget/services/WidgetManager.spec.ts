// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { type Signal, signal, type Type } from '@angular/core';
import type { IWidgetData } from '../models/IWidgetData';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetZone } from '../models/IWidgetZone';
import type { IWidget } from '../models/IWidget';
import { WIDGET } from '../provider/WIDGET';
import { WidgetManager } from './WidgetManager';
import { WidgetRegistry } from './WidgetRegistry';

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

describe('WidgetManager', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('registers every widget contributed under the WIDGET token, in registry order', () => {
        // Arrange
        const contributed = [fakeWidget('revenue', { order: 10 }), fakeWidget('people', { order: 0 })];

        // Act
        const manager = createManager(contributed);

        // Assert
        expect(manager.widgets().map((widget): string => widget.id)).toEqual(['people', 'revenue']);
    });

    it('publishes the same list the registry holds', () => {
        // Arrange
        const manager = createManager([fakeWidget('pipeline')]);

        // Act
        const result = manager.allWidgets();

        // Assert
        expect(result).toEqual(TestBed.inject(WidgetRegistry).all());
    });

    it('registers a widget contributed at runtime', () => {
        // Arrange
        const manager = createManager([]);

        // Act
        manager.registerWidget(fakeWidget('pipeline'));

        // Assert
        expect(manager.widgets().map((widget): string => widget.id)).toEqual(['pipeline']);
    });

    it('drops a widget again', () => {
        // Arrange
        const manager = createManager([fakeWidget('pipeline')]);

        // Act
        manager.unregisterWidget('pipeline');

        // Assert
        expect(manager.allWidgets()).toEqual([]);
    });

    it('starts empty when no feature contributed a widget', () => {
        // Act
        const manager = createManager([]);

        // Assert
        expect(manager.allWidgets()).toEqual([]);
    });
});

function createManager(widgets: ReadonlyArray<IWidget>): WidgetManager {
    TestBed.configureTestingModule({
        providers: [WidgetRegistry, WidgetManager, ...widgets.map((widget) => ({ provide: WIDGET, useValue: widget, multi: true }))],
    });

    return TestBed.inject(WidgetManager);
}
