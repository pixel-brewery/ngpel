// #region Imports

import { type Signal, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed } from '@angular/core/testing';
import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');
    const FloatingActionButtonComponent = angular.Component({
        selector: 'mosaik-fab',
        template: '<ng-content />',
        inputs: ['appearance', 'iconName', 'size', 'variant'],
    })(class {});
    const IconNameDirective = angular.Directive({ selector: '[iconName]' })(class {});

    return { FloatingActionButtonComponent, IconNameDirective };
});

import { BackTopComponent } from './BackTopComponent';

// #endregion

class TestResizeObserver implements ResizeObserver {
    public static latest: TestResizeObserver | null = null;
    private readonly _callback: ResizeObserverCallback;

    public constructor(callback: ResizeObserverCallback) {
        this._callback = callback;
        TestResizeObserver.latest = this;
    }

    public disconnect = vi.fn();
    public observe = vi.fn();
    public unobserve = vi.fn();

    public trigger(target: Element): void {
        this._callback([{ target } as ResizeObserverEntry], this);
    }
}

function setSignalInput<T>(inputSignal: Signal<T>, value: T): void {
    const node = (
        inputSignal as Signal<T> & {
            [SIGNAL]: { applyValueToInputSignal(node: unknown, inputValue: T): void };
        }
    )[SIGNAL];
    node.applyValueToInputSignal(node, value);
}

describe('BackTopComponent', () => {
    beforeEach(async () => {
        vi.stubGlobal('ResizeObserver', TestResizeObserver);
        await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
        await TestBed.configureTestingModule({ imports: [BackTopComponent] }).compileComponents();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        TestResizeObserver.latest = null;
        vi.unstubAllGlobals();
    });

    it('shows only for overflowing content beyond the threshold and re-evaluates on resize', () => {
        const fixture = TestBed.createComponent(BackTopComponent);
        const scrollable = document.createElement('div');
        Object.defineProperties(scrollable, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 500 },
            scrollTop: { configurable: true, writable: true, value: 120 },
        });

        setSignalInput(fixture.componentInstance.scrollable, scrollable);
        fixture.detectChanges();
        expect(fixture.componentInstance.visible()).toBe(false);

        scrollable.scrollTop = 121;
        scrollable.dispatchEvent(new Event('scroll'));
        expect(fixture.componentInstance.visible()).toBe(true);

        Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 100 });
        TestResizeObserver.latest?.trigger(scrollable);
        expect(fixture.componentInstance.visible()).toBe(false);
    });

    it('scrolls the explicit target with reduced motion and tears down listeners', () => {
        vi.stubGlobal(
            'matchMedia',
            vi.fn(() => ({ matches: true })),
        );
        const fixture = TestBed.createComponent(BackTopComponent);
        const scrollable = document.createElement('div');
        const scrollTo = vi.fn();
        const removeEventListener = vi.spyOn(scrollable, 'removeEventListener');
        Object.assign(scrollable, { scrollTo });
        Object.defineProperties(scrollable, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 500 },
            scrollTop: { configurable: true, writable: true, value: 200 },
        });

        setSignalInput(fixture.componentInstance.scrollable, scrollable);
        fixture.detectChanges();
        const action = fixture.nativeElement.querySelector('[test-id="back-top"]') as HTMLElement;
        action.click();

        expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
        fixture.destroy();
        expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
        expect(TestResizeObserver.latest?.disconnect).toHaveBeenCalled();
    });
});
