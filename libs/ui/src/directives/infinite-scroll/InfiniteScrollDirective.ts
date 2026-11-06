// #region Imports

import { DOCUMENT } from '@angular/common';
import { booleanAttribute, DestroyRef, Directive, ElementRef, inject, input, numberAttribute, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, fromEvent, map, Subject } from 'rxjs';

// #endregion

/**
 * Describes scroll position data emitted during infinite scroll detection.
 *
 * @internal
 */
interface IScrollPosition {
    /**
     * Current vertical scroll offset including the viewport height.
     *
     * @internal
     * @readonly
     */
    readonly y: number;

    /**
     * Total scrollable content height.
     *
     * @internal
     * @readonly
     */
    readonly height: number;
}

/**
 * Emits an event when the user scrolls near the end of a container.
 *
 * Attach this directive to an element containing a scrollable container to trigger
 * data loading when the user approaches the scroll boundary. The directive monitors
 * scroll events and emits when the scroll position exceeds the threshold defined by
 * the `offset` property.
 *
 * @example
 * ```html
 * <div ngpInfiniteScroll
 *      [ngpInfiniteScrollContainer]="'.scroll-area'"
 *      [ngpInfiniteScrollOffset]="100"
 *      (ngpInfiniteScrollReached)="loadMore()">
 *     <div class="scroll-area">
 *         <!-- scrollable content -->
 *     </div>
 * </div>
 * ```
 *
 * @public
 */
@Directive({
    selector: '[ngpInfiniteScroll]',
    exportAs: 'ngpInfiniteScroll',
})
export class InfiniteScrollDirective implements OnInit {
    // #region Fields

    /**
     * Host element reference for container queries.
     *
     * @private
     * @readonly
     */
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * Document reference for readiness detection.
     *
     * @private
     * @readonly
     */
    private readonly _document: Document = inject(DOCUMENT);

    /**
     * Destruction lifecycle reference for automatic subscription cleanup.
     *
     * @private
     * @readonly
     */
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    /**
     * Internal subject receiving scroll position updates.
     *
     * @private
     * @readonly
     */
    private readonly _scrollSubject = new Subject<IScrollPosition>();

    /**
     * Resolved scrollable container element.
     *
     * @private
     */
    private _containerElement: HTMLElement | null = null;

    /**
     * Cleanup function for the scroll event listener.
     *
     * @private
     */
    private _scrollListenerCleanup: (() => void) | null = null;

    // #endregion

    // #region Properties

    /**
     * Disables infinite scroll detection when `true`.
     *
     * Use this to temporarily pause scroll monitoring while a data request is
     * in progress or when no more data is available.
     *
     * @public
     * @readonly
     */
    public readonly disabled = input(false, {
        alias: 'ngpInfiniteScrollDisabled',
        transform: booleanAttribute,
    });

    /**
     * Debounce delay in milliseconds before processing scroll events.
     *
     * Higher values reduce processing frequency but increase perceived latency.
     *
     * @public
     * @readonly
     */
    public readonly delay = input(0, {
        alias: 'ngpInfiniteScrollDelay',
        transform: numberAttribute,
    });

    /**
     * Pixel offset from the scroll boundary to trigger the event early.
     *
     * A positive value causes the event to fire before reaching the absolute end,
     * allowing content to load before the user perceives the boundary.
     *
     * @public
     * @readonly
     */
    public readonly offset = input(0, {
        alias: 'ngpInfiniteScrollOffset',
        transform: numberAttribute,
    });

    /**
     * Reverses scroll direction detection for upward infinite scroll.
     *
     * When `true`, the directive monitors scroll-to-top instead of scroll-to-bottom.
     *
     * @public
     * @readonly
     */
    public readonly directionReversed = input(false, {
        alias: 'ngpInfiniteScrollDirectionReversed',
        transform: booleanAttribute,
    });

    /**
     * CSS selector or element reference identifying the scrollable container.
     *
     * If a string is provided, it is used as a query selector relative to the host
     * element. An empty string uses the host element itself as the container.
     *
     * @public
     * @readonly
     */
    public readonly container = input<string | HTMLElement>('.scroll-container', {
        alias: 'ngpInfiniteScrollContainer',
    });

    /**
     * Emits when the scroll position reaches the configured threshold.
     *
     * @public
     * @readonly
     */
    public readonly reached = output<void>({
        alias: 'ngpInfiniteScrollReached',
    });

    // #endregion

    // #region Methods

    /**
     * Initializes scroll monitoring after Angular processes inputs.
     *
     * @public
     */
    public ngOnInit(): void {
        this.setupScrollPipeline();
        this.initializeWhenReady();
    }

    /**
     * Configures the reactive scroll processing pipeline.
     *
     * @private
     */
    private setupScrollPipeline(): void {
        this._scrollSubject
            .pipe(
                debounceTime(this.delay()),
                map((scroll) => this.applyOffset(scroll)),
                filter((scroll) => this.isThresholdReached(scroll)),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe(() => this.reached.emit());
    }

    /**
     * Adjusts scroll position by the configured offset.
     *
     * @param scroll - Raw scroll position data.
     *
     * @returns Adjusted scroll position.
     *
     * @private
     */
    private applyOffset(scroll: IScrollPosition): IScrollPosition {
        return {
            y: scroll.y + this.offset(),
            height: scroll.height,
        };
    }

    /**
     * Determines whether the scroll threshold has been reached.
     *
     * @param scroll - Adjusted scroll position data.
     *
     * @returns `true` when the threshold is reached and the directive is enabled.
     *
     * @private
     */
    private isThresholdReached(scroll: IScrollPosition): boolean {
        if (this.disabled()) {
            return false;
        }

        return this.directionReversed() ? scroll.y <= this.offset() : scroll.y >= scroll.height;
    }

    /**
     * Defers container initialization until the document is fully loaded.
     *
     * @private
     */
    private initializeWhenReady(): void {
        if (this._document.readyState === 'complete') {
            this.initializeContainer();
        } else {
            fromEvent(this._document, 'readystatechange')
                .pipe(
                    filter(() => this._document.readyState === 'complete'),
                    takeUntilDestroyed(this._destroyRef),
                )
                .subscribe(() => this.initializeContainer());
        }
    }

    /**
     * Resolves the scrollable container and attaches the scroll listener.
     *
     * @private
     */
    private initializeContainer(): void {
        this.cleanupScrollListener();

        const containerValue = this.container();
        this._containerElement = this.resolveContainer(containerValue);

        if (this._containerElement === null) {
            return;
        }

        const abortController = new AbortController();

        this._containerElement.addEventListener('scroll', (event) => this.handleScroll(event), {
            signal: abortController.signal,
            passive: true,
        });

        this._scrollListenerCleanup = () => abortController.abort();

        this._destroyRef.onDestroy(() => this.cleanupScrollListener());
    }

    /**
     * Resolves the container element from a selector or reference.
     *
     * @param container - CSS selector or element reference.
     *
     * @returns Resolved element or `null` when not found.
     *
     * @private
     */
    private resolveContainer(container: string | HTMLElement): HTMLElement | null {
        if (typeof container !== 'string') {
            return container;
        }

        if (container.length === 0) {
            return this._elementRef.nativeElement;
        }

        return this._elementRef.nativeElement.querySelector<HTMLElement>(container);
    }

    /**
     * Processes scroll events and emits position data to the internal subject.
     *
     * @param event - Native scroll event.
     *
     * @private
     */
    private handleScroll(event: Event): void {
        const target = event.target as HTMLElement;

        this._scrollSubject.next({
            y: target.scrollTop + target.offsetHeight,
            height: target.scrollHeight,
        });
    }

    /**
     * Removes the active scroll event listener.
     *
     * @private
     */
    private cleanupScrollListener(): void {
        if (this._scrollListenerCleanup !== null) {
            this._scrollListenerCleanup();
            this._scrollListenerCleanup = null;
        }
    }

    // #endregion
}
