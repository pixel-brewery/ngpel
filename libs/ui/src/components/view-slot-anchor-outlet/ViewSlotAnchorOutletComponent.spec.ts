// #region Imports

import { Component, signal, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type IViewSlotDefinition, ViewSlotRegistry } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ViewSlotAnchorOutletComponent } from './ViewSlotAnchorOutletComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { InjectionToken } = await import('@angular/core');

    return {
        VIEW_SLOT_CONTEXT: new InjectionToken('VIEW_SLOT_CONTEXT'),
        ViewSlotRegistry: class ViewSlotRegistry {},
    };
});

vi.mock('../../directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective', () => ({
    ViewSlotAnchorTargetDirective: class ViewSlotAnchorTargetDirective {},
}));

@Component({ selector: 'test-first-view', template: '' })
class FirstView {}

@Component({ selector: 'test-second-view', template: '' })
class SecondView {}

describe('ViewSlotAnchorOutletComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('keeps the outlet loading without restarting a pending view when another view finishes first', async () => {
        // Arrange
        const first = createDeferredView();
        const second = createDeferredView();
        const views: Array<IViewSlotDefinition> = [
            { id: 'first', loadComponent: first.load },
            { id: 'second', loadComponent: second.load },
        ];
        TestBed.configureTestingModule({
            providers: [{ provide: ViewSlotRegistry, useValue: { getActiveViews: () => signal(views) } }],
        });
        const component = TestBed.runInInjectionContext(() => new ViewSlotAnchorOutletComponent());
        Object.defineProperty(component, 'slot', { value: signal('settings') });
        TestBed.tick();

        // Act
        second.resolve(SecondView);
        await second.load.mock.results[0]?.value;
        TestBed.tick();

        // Assert
        expect(component.getComponent('second')).toBe(SecondView);
        expect(component.isLoading()).toBe(true);
        expect(component.loadingViewId()).toBe('first');
        expect(first.load).toHaveBeenCalledOnce();
        first.resolve(FirstView);
        await first.load.mock.results[0]?.value;
        TestBed.tick();
        expect(component.getComponent('first')).toBe(FirstView);
        expect(component.isLoading()).toBe(false);
        expect(component.loadingViewId()).toBeNull();
    });
});

function createDeferredView() {
    let resolveView: (component: Type<unknown>) => void = () => undefined;
    const result = new Promise<Type<unknown>>((resolve) => {
        resolveView = resolve;
    });
    return { load: vi.fn(() => result), resolve: resolveView };
}
