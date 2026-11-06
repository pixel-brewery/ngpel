// #region Imports

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DRAWER_REF, type IDrawerRef } from '@pixel-brewery/mosaik-elements-angular';
import { Subject } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DrawerExteriorPlacementDirective } from './DrawerExteriorPlacementDirective';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { InjectionToken } = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    return {
        DRAWER_REF: new InjectionToken('TEST_DRAWER_REF'),
    };
});

class TestResizeObserver implements ResizeObserver {
    // #region Fields

    public readonly root = null;
    public readonly rootMargin = '';
    public readonly scrollMargin = '';
    public readonly thresholds: ReadonlyArray<number> = [];

    // #endregion

    // #region Ctor

    public constructor(callback: ResizeObserverCallback) {
        void callback;
    }

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    public disconnect(): void {
        return;
    }

    public observe(target: Element): void {
        void target;
    }

    public takeRecords(): ResizeObserverEntry[] {
        return [];
    }

    public unobserve(target: Element): void {
        void target;
    }

    // #endregion
}

@Component({
    imports: [DrawerExteriorPlacementDirective],
    template: '<div ngpDrawerExteriorPlacement [attr.test-id]="\'drawer-exterior-placement\'"></div>',
})
class TestHostComponent {
    // #region Fields
    // #endregion
    // #region Ctor
    // #endregion
    // #region Properties
    // #endregion
    // #region Methods
    // #endregion
}

describe('Drawer exterior placement', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it.each([
        ['viewport', 'ltr', 0, 0, 280],
        ['transformed drawer', 'ltr', 320, 40, 280],
        ['viewport', 'rtl', 0, 0, 944],
        ['transformed drawer', 'rtl', 320, 40, 944],
    ])(
        'keeps dialog content outside the %s %s drawer on its leading backdrop edge',
        async (_positioningContext, direction, positioningOriginLeft, positioningOriginTop, expectedViewportLeft) => {
            // arrange
            vi.stubGlobal('ResizeObserver', TestResizeObserver);
            const { drawerRef, sizeChanged } = createDrawerRef(direction);
            TestBed.configureTestingModule({
                imports: [TestHostComponent],
                providers: [{ provide: DRAWER_REF, useValue: drawerRef }],
            });
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
            const target = fixture.nativeElement.querySelector('[test-id="drawer-exterior-placement"]') as HTMLElement;
            Object.defineProperty(target, 'getBoundingClientRect', {
                value: vi.fn(() => new DOMRect(positioningOriginLeft, positioningOriginTop, 16, 160)),
            });
            await fixture.whenStable();

            // act
            sizeChanged.next({ width: 600 });

            // assert
            expect(target.style.position).toBe('fixed');
            expect(target.style.visibility).toBe('visible');
            expect(Number.parseFloat(target.style.left) + positioningOriginLeft).toBe(expectedViewportLeft);
            expect(Number.parseFloat(target.style.top) + positioningOriginTop).toBe(360);
            expect(target.style.transform).toBe('none');
        },
    );

    it('keeps dialog content outside while drawer attention changes the fixed positioning context', async () => {
        // arrange
        vi.stubGlobal('ResizeObserver', TestResizeObserver);
        const { closeAttempted, drawerRef, root } = createDrawerRef('ltr');
        let positioningOriginLeft = 0;
        let rootAnimationRunning = false;
        const scheduledFrames: FrameRequestCallback[] = [];
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
            scheduledFrames.push(callback);
            return 1;
        });
        vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
        Object.defineProperty(root, 'getAnimations', {
            value: vi.fn(() => (rootAnimationRunning ? [{ playState: 'running' }] : [])),
        });
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [{ provide: DRAWER_REF, useValue: drawerRef }],
        });
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        const target = fixture.nativeElement.querySelector('[test-id="drawer-exterior-placement"]') as HTMLElement;
        Object.defineProperty(target, 'getBoundingClientRect', {
            value: vi.fn(() => {
                const currentLeft = Number.parseFloat(target.style.left || '0');

                return new DOMRect(positioningOriginLeft + currentLeft, 40, 16, 160);
            }),
        });
        await fixture.whenStable();
        flushScheduledFrames(scheduledFrames);

        // act
        positioningOriginLeft = 320;
        rootAnimationRunning = true;
        closeAttempted.next();

        // assert
        expect(Number.parseFloat(target.style.left) + positioningOriginLeft).toBe(280);
        expect(scheduledFrames.length).toBeGreaterThanOrEqual(1);

        // act
        scheduledFrames.shift()?.(0);
        positioningOriginLeft = 0;
        rootAnimationRunning = false;
        scheduledFrames.shift()?.(16);
        scheduledFrames.shift()?.(32);

        // assert
        expect(Number.parseFloat(target.style.left) + positioningOriginLeft).toBe(280);
    });

    it('keeps dialog content outside when the opening animation releases its fixed positioning context', async () => {
        // arrange
        vi.stubGlobal('ResizeObserver', TestResizeObserver);
        const { drawerRef, root } = createDrawerRef('ltr');
        let positioningOriginLeft = 320;
        let rootAnimationRunning = true;
        const scheduledFrames: FrameRequestCallback[] = [];
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
            scheduledFrames.push(callback);
            return 1;
        });
        vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
        Object.defineProperty(root, 'getAnimations', {
            value: vi.fn(() => (rootAnimationRunning ? [{ playState: 'running' }] : [])),
        });
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [{ provide: DRAWER_REF, useValue: drawerRef }],
        });
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        const target = fixture.nativeElement.querySelector('[test-id="drawer-exterior-placement"]') as HTMLElement;
        Object.defineProperty(target, 'getBoundingClientRect', {
            value: vi.fn(() => {
                const currentLeft = Number.parseFloat(target.style.left || '0');

                return new DOMRect(positioningOriginLeft + currentLeft, 40, 16, 160);
            }),
        });
        await fixture.whenStable();

        // assert
        expect(Number.parseFloat(target.style.left) + positioningOriginLeft).toBe(280);
        expect(scheduledFrames.length).toBeGreaterThanOrEqual(1);

        // act
        for (const callback of scheduledFrames.splice(0)) {
            callback(0);
        }
        positioningOriginLeft = 0;
        rootAnimationRunning = false;
        flushScheduledFrames(scheduledFrames);

        // assert
        expect(Number.parseFloat(target.style.left) + positioningOriginLeft).toBe(280);
    });
});

function createDrawerRef(direction: string): {
    closeAttempted: Subject<void>;
    drawerRef: IDrawerRef;
    root: HTMLElement;
    sizeChanged: Subject<Partial<{ width: number | string; height: number | string }>>;
} {
    const drawer = document.createElement('div') as unknown as HTMLElement & { updateComplete: Promise<boolean> };
    drawer.style.direction = direction;
    Object.defineProperty(drawer, 'updateComplete', { value: Promise.resolve(true) });
    const shadowRoot = drawer.attachShadow({ mode: 'open' });
    const root = document.createElement('div');
    root.setAttribute('part', 'root');
    Object.defineProperty(root, 'getBoundingClientRect', {
        value: vi.fn(() => new DOMRect(320, 40, 600, 800)),
    });
    shadowRoot.append(root);
    const positionChanged = new Subject<Partial<{ top: number | string; bottom: number | string; left: number | string; right: number | string }>>();
    const closeAttempted = new Subject<void>();
    const sizeChanged = new Subject<Partial<{ width: number | string; height: number | string }>>();

    return {
        closeAttempted,
        drawerRef: {
            closeAttempted,
            element: drawer,
            positionChanged,
            sizeChanged,
        } as unknown as IDrawerRef,
        root,
        sizeChanged,
    };
}

function flushScheduledFrames(scheduledFrames: FrameRequestCallback[]): void {
    let frame = 0;

    while (scheduledFrames.length > 0 && frame < 20) {
        scheduledFrames.shift()?.(frame * 16);
        frame += 1;
    }

    expect(scheduledFrames).toHaveLength(0);
}
