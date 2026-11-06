// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { type Signal, signal, type Type } from '@angular/core';
import type { IWidget } from '../models/IWidget';
import type { IWidgetData } from '../models/IWidgetData';
import type { IWidgetSpanRange } from '../models/IWidgetSpanRange';
import type { IWidgetZone } from '../models/IWidgetZone';
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

describe('WidgetRegistry', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('publishes widgets by their order and breaks ties by id', () => {
        // Arrange
        const registry = createRegistry();
        registry.register(fakeWidget('revenue', { order: 10 }));
        registry.register(fakeWidget('people', { order: 0 }));

        // Act
        registry.register(fakeWidget('assembly', { order: 0 }));

        // Assert
        expect(registry.widgets().map((widget): string => widget.id)).toEqual(['assembly', 'people', 'revenue']);
    });

    it('replaces a widget already registered under the same id', () => {
        // Arrange
        const registry = createRegistry();
        registry.register(fakeWidget('pipeline', { title: 'Old' }));

        // Act
        registry.register(fakeWidget('pipeline', { title: 'New' }));

        // Assert
        expect(registry.all()).toHaveLength(1);
        expect(registry.get('pipeline')?.title()).toBe('New');
    });

    it('notifies the RxJS consumers about a registration', () => {
        // Arrange
        const registry = createRegistry();
        const changes: Array<void> = [];
        registry.widgetChanged.subscribe((change): number => changes.push(change));

        // Act
        registry.register(fakeWidget('pipeline'));

        // Assert
        expect(changes).toHaveLength(1);
    });

    it('drops a registered widget', () => {
        // Arrange
        const registry = createRegistry();
        registry.register(fakeWidget('pipeline'));

        // Act
        registry.unregister('pipeline');

        // Assert
        expect(registry.all()).toEqual([]);
        expect(registry.get('pipeline')).toBeUndefined();
    });

    it('stays silent when a widget it does not know is unregistered', () => {
        // Arrange
        const registry = createRegistry();
        const changes: Array<void> = [];
        registry.widgetChanged.subscribe((change): number => changes.push(change));

        // Act
        registry.unregister('unknown');

        // Assert
        expect(changes).toHaveLength(0);
    });

    it('returns nothing for a widget it does not know', () => {
        // Arrange
        const registry = createRegistry();

        // Act
        const result = registry.get('unknown');

        // Assert
        expect(result).toBeUndefined();
    });
});

function createRegistry(): WidgetRegistry {
    TestBed.configureTestingModule({ providers: [WidgetRegistry] });

    return TestBed.inject(WidgetRegistry);
}
