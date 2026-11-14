import { Component, signal, type Type, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IWidget } from '../models/IWidget';
import { WIDGET_DATA } from '../provider/WIDGET_DATA';
import { WIDGET_SIZE } from '../provider/WIDGET_SIZE';
import { WidgetComponent } from './WidgetComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await import('@angular/core');
    const stub = (selector: string, inputs: string[] = []): Type<unknown> => {
        class Stub {}
        angular.Component({ selector, inputs, template: '<ng-content />' })(Stub);
        return Stub;
    };
    class FlipToDirective {}
    angular.Directive({ selector: '[mosaikFlipTo]', inputs: ['mosaikFlipTo'] })(FlipToDirective);
    class IconNameDirective {}
    angular.Directive({ selector: '[iconName]', inputs: ['iconName'] })(IconNameDirective);

    return {
        ButtonComponent: stub('mosaik-button'),
        CardComponent: stub('mosaik-card', ['appearance', 'elevation']),
        CardContentComponent: stub('mosaik-card-content'),
        CardHeaderComponent: stub('mosaik-card-header', ['text', 'subText']),
        FlipComponent: stub('mosaik-flip', ['side']),
        FlipToDirective,
        IconNameDirective,
        TOUR_ACCESSOR: new angular.InjectionToken('TOUR_ACCESSOR'),
        createTourAccessorTarget: (element: unknown) => ({ element }),
    };
});

vi.mock('@pixel-brewery/ngpel-ui', () => ({
    resolveDeclarativeTourTargetElements: () => new Map(),
    WIDGET_TOUR_TARGETS: { surface: 'surface' },
}));

@Component({ template: '' })
class PrimaryView {}

@Component({ template: '' })
class StaleView {}

const base: IWidget = {
    id: 'current',
    order: 0,
    title: signal('Current'),
    layout: {
        defaultZone: { id: 'widgets', iconName: 'grid', order: 0 },
        enabledByDefault: true,
        columnSpan: { default: 3, min: 2, max: 6 },
        rowSpan: { default: 2, min: 2, max: 4 },
    },
    views: { front: async () => PrimaryView },
};

describe('WidgetComponent', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('publishes the current contribution data and live size to a lazy widget', () => {
        const widget = createWidget(signal({ ...base, data: { id: 'payload' } }));
        const size = signal({ columnSpan: 4, rowSpan: 3 });
        Object.defineProperty(widget, 'gridSize', { value: size });
        const injector = widget.childInjector();

        size.set({ columnSpan: 2, rowSpan: 2 });

        expect(injector.get(WIDGET_DATA)).toEqual({ id: 'payload' });
        expect(injector.get(WIDGET_SIZE)()).toEqual({ columnSpan: 2, rowSpan: 2 });
    });

    it('ignores a lazy face that finishes after the contribution changes', async () => {
        let resolveStale!: (view: typeof StaleView) => void;
        const pending = new Promise<typeof StaleView>((resolve) => {
            resolveStale = resolve;
        });
        const configuration = signal<IWidget>({ ...base, id: 'stale', views: { front: () => pending } });
        const widget = createWidget(configuration);
        TestBed.tick();
        configuration.set(base);
        TestBed.tick();
        await vi.waitFor(() => expect(widget.frontComponent()).toBe(PrimaryView));

        resolveStale(StaleView);
        await pending;
        await Promise.resolve();

        expect(widget.frontComponent()).toBe(PrimaryView);
    });
});

function createWidget(configuration: WritableSignal<IWidget>): WidgetComponent {
    TestBed.configureTestingModule({ imports: [WidgetComponent] });
    const fixture = TestBed.createComponent(WidgetComponent);
    Object.defineProperty(fixture.componentInstance, 'configuration', { value: configuration });
    return fixture.componentInstance;
}
