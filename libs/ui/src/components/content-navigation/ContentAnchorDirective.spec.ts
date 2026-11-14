// #region Imports

import { DOCUMENT } from '@angular/common';
import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ContentAnchorDirective } from './ContentAnchorDirective';
import { ContentNavigationContext } from './ContentNavigationContext';

// #endregion

describe('Content navigation anchor', () => {
    describe('viewport synchronization', () => {
        it('tracks the anchor in a band based on the height and position of the nested scroll viewport', () => {
            // arrange
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary' });
            const scrollContainer = document.createElement('div');
            const element = document.createElement('section');
            scrollContainer.append(element);
            Object.defineProperties(scrollContainer, {
                clientHeight: { value: 500 },
                scrollHeight: { value: 1_500 },
                scrollTop: { value: 250, writable: true },
            });
            vi.spyOn(scrollContainer, 'getBoundingClientRect').mockReturnValue({ top: 100, width: 1_600 } as DOMRect);
            let elementTop = 201;
            vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() => ({ top: elementTop, bottom: elementTop + 250 }) as DOMRect);
            const documentValue = {
                defaultView: {
                    innerHeight: 1_000,
                    getComputedStyle: () => ({ overflowY: 'auto' }),
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
            const activeBeforeEnteringBand = context.activeItemId();

            // act
            elementTop = 198;
            scrollContainer.scrollTop = 253;
            scrollContainer.dispatchEvent(new Event('scroll'));

            // assert
            expect(activeBeforeEnteringBand).toBe('summary');
            expect(context.activeItemId()).toBe('signature');
        });

        it('tracks document scrolling even when the root element declares overflow auto', () => {
            // arrange
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary' });
            const root = document.createElement('div');
            const element = document.createElement('section');
            root.append(element);
            let elementTop = 1_100;
            vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() => ({ top: elementTop, bottom: elementTop + 200 }) as DOMRect);
            let scrollY = 0;
            const scrollTarget = new EventTarget();
            const documentValue = {
                defaultView: {
                    addEventListener: scrollTarget.addEventListener.bind(scrollTarget),
                    removeEventListener: scrollTarget.removeEventListener.bind(scrollTarget),
                    innerHeight: 1_000,
                    getComputedStyle: () => ({ overflowY: 'auto' }),
                    get scrollY() {
                        return scrollY;
                    },
                },
                documentElement: root,
                scrollingElement: { scrollHeight: 3_000 },
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
            Object.defineProperty(directive, 'anchor', { value: signal({ id: 'signature', label: 'Signature' }) });
            directive.ngOnInit();
            directive.ngAfterViewInit();

            // act
            elementTop = 48;
            scrollY = 1_052;
            scrollTarget.dispatchEvent(new Event('scroll'));

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
