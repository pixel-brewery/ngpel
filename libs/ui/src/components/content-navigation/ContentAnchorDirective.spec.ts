// #region Imports

import { DOCUMENT } from '@angular/common';
import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContentAnchorDirective } from './ContentAnchorDirective';
import { ContentNavigationContext } from './ContentNavigationContext';

// #endregion

class TestIntersectionObserver implements IntersectionObserver {
    // #region Fields

    public static latest: TestIntersectionObserver | null = null;

    public readonly root: Element | Document | null;
    public readonly rootMargin: string;
    public readonly scrollMargin = '';
    public readonly thresholds: ReadonlyArray<number>;
    private readonly _callback: IntersectionObserverCallback;
    private readonly _observedTargets = new Set<Element>();

    // #endregion

    // #region Ctor

    public constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
        this._callback = callback;
        this.root = options.root ?? null;
        this.rootMargin = options.rootMargin ?? '';
        this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold ?? 0];
        TestIntersectionObserver.latest = this;
    }

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    public disconnect(): void {
        this._observedTargets.clear();
    }

    public observe(target: Element): void {
        this._observedTargets.add(target);
    }

    public takeRecords(): IntersectionObserverEntry[] {
        return [];
    }

    public trigger(isIntersecting: boolean): void {
        const [target] = this._observedTargets;

        if (!target) {
            return;
        }

        this._callback(
            [
                {
                    isIntersecting,
                    target,
                } as IntersectionObserverEntry,
            ],
            this,
        );
    }

    public unobserve(target: Element): void {
        this._observedTargets.delete(target);
    }

    // #endregion
}

describe('Content navigation anchor', () => {
    afterEach(() => {
        TestIntersectionObserver.latest = null;
        vi.restoreAllMocks();
    });

    describe('viewport synchronization', () => {
        it('activates its destination when the anchor enters the viewport tracking band', () => {
            // arrange
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary' });
            const element = document.createElement('section');
            const documentValue = {
                defaultView: {
                    addEventListener: vi.fn(),
                    innerHeight: 1_000,
                    IntersectionObserver: TestIntersectionObserver,
                    removeEventListener: vi.fn(),
                    scrollY: 250,
                },
                documentElement: {
                    clientHeight: 1_000,
                    scrollHeight: 2_000,
                },
            } as unknown as Document;
            TestBed.configureTestingModule({
                providers: [
                    ContentAnchorDirective,
                    { provide: ContentNavigationContext, useValue: context },
                    { provide: DOCUMENT, useValue: documentValue },
                    { provide: ElementRef, useValue: new ElementRef(element) },
                ],
            });
            const directive = TestBed.inject(ContentAnchorDirective);
            Object.defineProperty(directive, 'anchor', {
                value: signal({ id: 'signature', label: 'Signature' }),
            });
            directive.ngOnInit();
            directive.ngAfterViewInit();

            // act
            TestIntersectionObserver.latest?.trigger(true);

            // assert
            expect(context.activeItemId()).toBe('signature');
        });

        it('keeps the first destination active at the top and selects the last one at the scroll boundary', () => {
            // arrange
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary', order: 10 });
            const scrollContainer = document.createElement('div');
            const element = document.createElement('section');
            scrollContainer.append(element);
            let scrollTop = 0;
            Object.defineProperties(scrollContainer, {
                clientHeight: { value: 500 },
                scrollHeight: { value: 1_500 },
                scrollTop: {
                    get: (): number => scrollTop,
                    set: (value: number): void => {
                        scrollTop = value;
                    },
                },
            });
            const documentValue = {
                defaultView: {
                    IntersectionObserver: TestIntersectionObserver,
                    getComputedStyle: (target: Element): Pick<CSSStyleDeclaration, 'overflowY'> => ({
                        overflowY: target === scrollContainer ? 'auto' : 'visible',
                    }),
                    matchMedia: (): { readonly matches: boolean } => ({ matches: false }),
                },
            } as unknown as Document;
            TestBed.configureTestingModule({
                providers: [
                    ContentAnchorDirective,
                    { provide: ContentNavigationContext, useValue: context },
                    { provide: DOCUMENT, useValue: documentValue },
                    { provide: ElementRef, useValue: new ElementRef(element) },
                ],
            });
            const directive = TestBed.inject(ContentAnchorDirective);
            Object.defineProperty(directive, 'anchor', {
                value: signal({ id: 'signature', label: 'Signature', order: 20 }),
            });
            directive.ngOnInit();
            directive.ngAfterViewInit();
            TestIntersectionObserver.latest?.trigger(true);
            const activeAtStart = context.activeItemId();

            // act
            scrollContainer.scrollTop = 1_000;
            scrollContainer.dispatchEvent(new Event('scroll'));

            // assert
            expect(activeAtStart).toBe('summary');
            expect(context.activeItemId()).toBe('signature');
        });

        it('scrolls its own destination without resolving a global duplicate ID', () => {
            // arrange
            const context = new ContentNavigationContext();
            const element = document.createElement('section');
            const scrollIntoView = vi.fn();
            Object.defineProperty(element, 'scrollIntoView', { value: scrollIntoView });
            const documentValue = {
                defaultView: {
                    matchMedia: (): { readonly matches: boolean } => ({ matches: false }),
                },
            } as unknown as Document;
            TestBed.configureTestingModule({
                providers: [
                    ContentAnchorDirective,
                    { provide: ContentNavigationContext, useValue: context },
                    { provide: DOCUMENT, useValue: documentValue },
                    { provide: ElementRef, useValue: new ElementRef(element) },
                ],
            });
            const directive = TestBed.inject(ContentAnchorDirective);
            Object.defineProperty(directive, 'anchor', {
                value: signal({ id: 'details', label: 'Details' }),
            });
            directive.ngOnInit();

            // act
            context.navigate('details');

            // assert
            expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        });
    });
});
