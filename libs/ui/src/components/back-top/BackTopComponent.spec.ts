// #region Imports

import { type Signal, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed } from '@angular/core/testing';
import { AnimationPlayer } from '@pixel-brewery/mosaik-elements-foundation';
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

vi.mock('@pixel-brewery/mosaik-elements-foundation', () => ({
    AnimationPlayer: class {
        public stopAll = vi.fn(async () => []);
        public playToFinal = vi.fn(async (element: HTMLElement) => {
            element.style.opacity = '0';
            return new Event('finish');
        });
    },
    AnimationPreset: { fadeOut: { steps: [{ opacity: 1 }, { opacity: 0 }] } },
}));

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
        await TestBed.configureTestingModule({
            imports: [BackTopComponent],
            providers: [AnimationPlayer],
        }).compileComponents();
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

    it('waits until the observed intro has completely left the scroll container', () => {
        const fixture = TestBed.createComponent(BackTopComponent);
        const scrollable = document.createElement('div');
        const intro = document.createElement('section');
        scrollable.append(intro);
        Object.defineProperties(scrollable, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 800 },
            scrollTop: { configurable: true, writable: true, value: 120 },
        });
        vi.spyOn(scrollable, 'getBoundingClientRect').mockReturnValue({ top: 70 } as DOMRect);
        let introBottomAtTop = 480;
        vi.spyOn(intro, 'getBoundingClientRect').mockImplementation(() => ({ bottom: introBottomAtTop - scrollable.scrollTop }) as DOMRect);

        setSignalInput(fixture.componentInstance.scrollable, scrollable);
        setSignalInput(fixture.componentInstance.revealAfter, intro);
        fixture.detectChanges();
        expect(fixture.componentInstance.visible()).toBe(false);

        scrollable.scrollTop = 409;
        scrollable.dispatchEvent(new Event('scroll'));
        expect(fixture.componentInstance.visible()).toBe(false);

        scrollable.scrollTop = 410;
        scrollable.dispatchEvent(new Event('scroll'));
        expect(fixture.componentInstance.visible()).toBe(true);

        introBottomAtTop = 500;
        TestResizeObserver.latest?.trigger(intro);
        expect(fixture.componentInstance.visible()).toBe(false);

        introBottomAtTop = 480;
        TestResizeObserver.latest?.trigger(intro);
        expect(fixture.componentInstance.visible()).toBe(true);

        scrollable.scrollTop = 405;
        scrollable.dispatchEvent(new Event('scroll'));
        expect(fixture.componentInstance.visible()).toBe(false);

        fixture.destroy();
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

    it('keeps the scroll target when loading content initially has no overflow', () => {
        const scrollable = document.createElement('div');
        scrollable.style.overflowY = 'auto';
        Object.defineProperties(scrollable, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 100 },
            scrollTop: { configurable: true, writable: true, value: 0 },
        });
        document.body.append(scrollable);
        const fixture = TestBed.createComponent(BackTopComponent);
        scrollable.append(fixture.nativeElement);
        fixture.detectChanges();

        Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 500 });
        scrollable.scrollTop = 180;
        scrollable.dispatchEvent(new Event('scroll'));

        expect(fixture.componentInstance.visible()).toBe(true);
        fixture.destroy();
        scrollable.remove();
    });

    it('shows after scrolling a container attached after the first render and hides at its top', () => {
        const fixture = TestBed.createComponent(BackTopComponent);
        fixture.detectChanges();

        const scrollable = document.createElement('div');
        scrollable.style.overflowY = 'auto';
        Object.defineProperties(scrollable, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 500 },
            scrollTop: { configurable: true, writable: true, value: 0 },
        });
        scrollable.append(fixture.nativeElement);
        document.body.append(scrollable);
        expect(fixture.componentInstance.visible()).toBe(false);

        scrollable.scrollTop = 180;
        scrollable.dispatchEvent(new Event('scroll'));
        expect(fixture.componentInstance.visible()).toBe(true);

        scrollable.scrollTop = 0;
        scrollable.dispatchEvent(new Event('scroll'));
        expect(fixture.componentInstance.visible()).toBe(false);

        fixture.destroy();
        scrollable.remove();
    });

    it('completes the leave lifecycle only after Mosaik finishes fading out', async () => {
        const fixture = TestBed.createComponent(BackTopComponent);
        setSignalInput(fixture.componentInstance.animate, true);
        const player = TestBed.inject(AnimationPlayer);
        const element = document.createElement('div');
        const animationComplete = vi.fn();
        let finishFade: (() => void) | undefined;
        const playToFinal = vi.spyOn(player, 'playToFinal').mockImplementation(
            () =>
                new Promise<AnimationPlaybackEvent>((resolve) => {
                    finishFade = () => resolve(new Event('finish') as AnimationPlaybackEvent);
                }),
        );

        const component = fixture.componentInstance as unknown as {
            onLeave(event: { target: Element; animationComplete: () => void }): void;
        };
        component.onLeave({ target: element, animationComplete });
        await Promise.resolve();

        expect(playToFinal).toHaveBeenCalledOnce();
        expect(animationComplete).not.toHaveBeenCalled();

        finishFade?.();
        await vi.waitFor(() => expect(animationComplete).toHaveBeenCalledOnce());

        fixture.destroy();
    });
});
