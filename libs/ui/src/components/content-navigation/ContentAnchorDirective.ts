// #region Imports

import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, input, type AfterViewInit, type OnDestroy, type OnInit } from '@angular/core';
import { ContentNavigationContext, type ContentNavigationScrollDirection, type IContentNavigationViewportState } from './ContentNavigationContext';
import type { IContentNavigationItem } from './IContentNavigationItem';

// #endregion

/**
 * Registers a semantic heading or section as an in-page navigation destination.
 *
 * @public
 */
@Directive({
    selector: '[ngpContentAnchor]',
    host: {
        '[attr.id]': 'anchor().id',
        class: 'scroll-mt-8',
    },
})
export class ContentAnchorDirective implements AfterViewInit, OnInit, OnDestroy {
    // #region Fields

    /**
     * Stable destination metadata.
     *
     * @public
     * @readonly
     */
    public readonly anchor = input.required<IContentNavigationItem>({ alias: 'ngpContentAnchor' });

    private readonly _context = inject(ContentNavigationContext);
    private readonly _document = inject(DOCUMENT);
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private _intersectionObserver: IntersectionObserver | null = null;
    private _lastScrollTop = 0;
    private _scrollContainer: HTMLElement | null = null;
    private _scrollDirection: ContentNavigationScrollDirection = 'down';
    private _unregister: (() => void) | null = null;
    private _unregisterScrollListener: (() => void) | null = null;

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    /**
     * Registers the anchor after Angular has resolved the required input.
     *
     * @public
     */
    public ngOnInit(): void {
        this._unregister = this._context.register(this.anchor(), () => {
            this.scrollIntoView();
        });
    }

    /**
     * Observes the anchor inside a narrow viewport band to keep the outline in sync with scrolling.
     *
     * @public
     */
    public ngAfterViewInit(): void {
        const defaultView = this._document.defaultView;
        const IntersectionObserverConstructor = defaultView?.IntersectionObserver;

        if (!defaultView || !IntersectionObserverConstructor) {
            return;
        }

        this._scrollContainer = this.resolveScrollContainer(defaultView);
        this._lastScrollTop = this.readScrollTop();
        const scrollTarget = this._scrollContainer ?? defaultView;
        const handleScroll = (): void => {
            this.handleScroll();
        };
        scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
        this._unregisterScrollListener = (): void => {
            scrollTarget.removeEventListener('scroll', handleScroll);
        };

        this._intersectionObserver = new IntersectionObserverConstructor(
            (entries): void => {
                this.handleIntersections(entries);
            },
            {
                root: this._scrollContainer,
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            },
        );
        this._intersectionObserver.observe(this._elementRef.nativeElement);
        this.synchronizeViewport();
    }

    /**
     * Removes the destination when its routed content is destroyed.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this._intersectionObserver?.disconnect();
        this._intersectionObserver = null;
        this._unregisterScrollListener?.();
        this._unregisterScrollListener = null;
        this._scrollContainer = null;
        this._unregister?.();
        this._unregister = null;
    }

    private handleIntersections(entries: ReadonlyArray<IntersectionObserverEntry>): void {
        this.updateScrollDirection();
        const viewport = this.readViewportState();

        for (const entry of entries) {
            this._context.synchronizeIntersection(this.anchor().id, entry.isIntersecting, viewport);
        }
    }

    private handleScroll(): void {
        this.updateScrollDirection();
        this.synchronizeViewport();
    }

    private readScrollTop(): number {
        if (this._scrollContainer) {
            return this._scrollContainer.scrollTop;
        }

        return this._document.defaultView?.scrollY ?? this._document.scrollingElement?.scrollTop ?? 0;
    }

    private readViewportState(): IContentNavigationViewportState {
        const scrollTop = this.readScrollTop();
        const viewportHeight = this._scrollContainer?.clientHeight ?? this._document.defaultView?.innerHeight ?? this._document.documentElement.clientHeight;
        const scrollHeight =
            this._scrollContainer?.scrollHeight ?? this._document.scrollingElement?.scrollHeight ?? this._document.documentElement.scrollHeight;

        return {
            direction: this._scrollDirection,
            isAtEnd: scrollTop + viewportHeight >= scrollHeight - 1,
            isAtStart: scrollTop <= 1,
        };
    }

    private resolveScrollContainer(defaultView: Window): HTMLElement | null {
        let candidate = this._elementRef.nativeElement.parentElement;

        while (candidate) {
            const overflowY = defaultView.getComputedStyle(candidate).overflowY;

            if (/^(auto|overlay|scroll)$/u.test(overflowY)) {
                return candidate;
            }

            candidate = candidate.parentElement;
        }

        return null;
    }

    private synchronizeViewport(): void {
        this._context.synchronizeViewport(this.readViewportState());
    }

    private updateScrollDirection(): void {
        const scrollTop = this.readScrollTop();

        if (scrollTop > this._lastScrollTop + 1) {
            this._scrollDirection = 'down';
        } else if (scrollTop < this._lastScrollTop - 1) {
            this._scrollDirection = 'up';
        }

        this._lastScrollTop = scrollTop;
    }

    private scrollIntoView(): void {
        const prefersReducedMotion = this._document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

        this._elementRef.nativeElement.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    }

    // #endregion
}
