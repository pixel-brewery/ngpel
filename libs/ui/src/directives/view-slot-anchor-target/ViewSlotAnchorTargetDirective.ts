// #region Imports

import { DestroyRef, Directive, effect, ElementRef, inject, input } from '@angular/core';

// #endregion

/**
 * Scrolls an anchored view-slot item into view when it becomes the active anchor.
 *
 * The host represents one anchor of an outlet that renders several anchored items in a scroll
 * container. When the active anchor matches the host, the host is scrolled into view; while the
 * user has not scrolled manually, preceding items that change height (lazy content) trigger a
 * realignment so the anchor stays at the top. A monotonic request marker re-scrolls an anchor
 * that is already active.
 *
 * @example
 * ```html
 * @for (section of sections(); track section.id) {
 *     <section [ngpViewSlotAnchorTarget]="section.id" [ngpViewSlotActiveAnchor]="activeAnchor()" [ngpViewSlotAnchorRequest]="anchorRequest()">
 *         <ng-container *ngTemplateOutlet="section.template" />
 *     </section>
 * }
 * ```
 *
 * @public
 */
@Directive({
    selector: '[ngpViewSlotAnchorTarget]',
    exportAs: 'ngpViewSlotAnchorTarget',
})
export class ViewSlotAnchorTargetDirective {
    // #region Fields

    private readonly _host: HTMLElement;
    private readonly _cancelAnchorTrackingListener: EventListener;
    private readonly _observedAnchorHeights: Map<Element, number> = new Map<Element, number>();
    private _anchorResizeObserver: ResizeObserver | null = null;
    private _anchorScrollContainer: HTMLElement | null = null;
    private _correctionAnimationFrameId: number | null = null;
    private _lastScrollSignature: string | null = null;
    private _scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ViewSlotAnchorTargetDirective` class.
     *
     * @public
     * @param elementRef The host element representing the anchor.
     * @param destroyRef The destruction lifecycle used to cancel pending work.
     */
    public constructor(elementRef: ElementRef<HTMLElement> = inject(ElementRef), destroyRef: DestroyRef = inject(DestroyRef)) {
        this._host = elementRef.nativeElement;
        this._cancelAnchorTrackingListener = () => this.stopAnchorTracking();
        effect(() => this.handleAnchorState());
        destroyRef.onDestroy(() => this.destroy());
    }

    // #endregion

    // #region Properties

    /**
     * Anchor identifier represented by the host element.
     *
     * @public
     * @readonly
     */
    public readonly anchor = input.required<string>({ alias: 'ngpViewSlotAnchorTarget' });

    /**
     * Currently active anchor identifier.
     *
     * @public
     * @readonly
     */
    public readonly activeAnchor = input<string | null>(null, { alias: 'ngpViewSlotActiveAnchor' });

    /**
     * Monotonic request marker used to re-scroll the same active anchor.
     *
     * @public
     * @readonly
     */
    public readonly request = input<number>(0, { alias: 'ngpViewSlotAnchorRequest' });

    // #endregion

    // #region Methods

    private clearPendingScroll(): void {
        if (this._scrollTimeout === null) {
            return;
        }

        clearTimeout(this._scrollTimeout);
        this._scrollTimeout = null;
    }

    private destroy(): void {
        this.clearPendingScroll();
        this.stopAnchorTracking();
    }

    private findScrollContainer(target: HTMLElement): HTMLElement | null {
        let ancestor = target.parentElement;

        while (ancestor) {
            const overflowY = target.ownerDocument.defaultView?.getComputedStyle(ancestor).overflowY ?? '';

            if (ancestor.scrollHeight > ancestor.clientHeight && (overflowY === 'auto' || overflowY === 'scroll')) {
                return ancestor;
            }

            ancestor = ancestor.parentElement;
        }

        return null;
    }

    private getScrollSignature(): string | null {
        const target = this.anchor();
        const activeAnchor = this.activeAnchor();

        if (!activeAnchor || activeAnchor !== target) {
            return null;
        }

        return `${target}:${this.request()}`;
    }

    private handleAnchorState(): void {
        const signature = this.getScrollSignature();

        if (signature === null) {
            this.clearPendingScroll();
            this.stopAnchorTracking();
            return;
        }

        this.scheduleScroll(signature);
    }

    private handleAnchorResizes(entries: ReadonlyArray<ResizeObserverEntry>): void {
        let didResize = false;

        for (const entry of entries) {
            const currentHeight = entry.target.getBoundingClientRect().height;
            const previousHeight = this._observedAnchorHeights.get(entry.target);
            this._observedAnchorHeights.set(entry.target, currentHeight);

            if (previousHeight !== undefined && Math.abs(currentHeight - previousHeight) >= 0.5) {
                didResize = true;
            }
        }

        if (didResize) {
            this.scheduleAnchorCorrection();
        }
    }

    private observeAnchorsThroughTarget(observer: ResizeObserver, target: HTMLElement): void {
        const outlet = target.parentElement;

        if (!outlet) {
            return;
        }

        for (const anchor of Array.from(outlet.children)) {
            this._observedAnchorHeights.set(anchor, anchor.getBoundingClientRect().height);
            observer.observe(anchor);

            if (anchor === target) {
                break;
            }
        }
    }

    private scheduleAnchorCorrection(): void {
        if (this._correctionAnimationFrameId !== null || !this._anchorResizeObserver) {
            return;
        }

        const defaultView = this._host.ownerDocument.defaultView;

        if (!defaultView) {
            this.scrollToAnchor('auto');
            return;
        }

        this._correctionAnimationFrameId = defaultView.requestAnimationFrame(() => {
            this._correctionAnimationFrameId = null;

            if (this._anchorResizeObserver) {
                this.scrollToAnchor('auto');
            }
        });
    }

    private scheduleScroll(signature: string): void {
        if (this._lastScrollSignature === signature) {
            return;
        }

        this._lastScrollSignature = signature;
        this.clearPendingScroll();
        this._scrollTimeout = setTimeout(() => {
            this._scrollTimeout = null;
            this.startAnchorTracking();
            this.scrollToAnchor('smooth');
        });
    }

    private scrollToAnchor(behavior: ScrollBehavior): void {
        this._host.scrollIntoView({ behavior, block: 'start', inline: 'nearest' });
    }

    private startAnchorTracking(): void {
        this.stopAnchorTracking();

        const target = this._host;
        const ResizeObserverConstructor = target.ownerDocument.defaultView?.ResizeObserver;

        if (!ResizeObserverConstructor) {
            return;
        }

        this._anchorResizeObserver = new ResizeObserverConstructor((entries) => this.handleAnchorResizes(entries));
        this.observeAnchorsThroughTarget(this._anchorResizeObserver, target);
        this._anchorScrollContainer = this.findScrollContainer(target);
        this._anchorScrollContainer?.addEventListener('pointerdown', this._cancelAnchorTrackingListener);
        this._anchorScrollContainer?.addEventListener('touchstart', this._cancelAnchorTrackingListener, { passive: true });
        this._anchorScrollContainer?.addEventListener('wheel', this._cancelAnchorTrackingListener, { passive: true });
    }

    private stopAnchorTracking(): void {
        const defaultView = this._host.ownerDocument.defaultView;

        if (this._correctionAnimationFrameId !== null && defaultView) {
            defaultView.cancelAnimationFrame(this._correctionAnimationFrameId);
        }

        this._correctionAnimationFrameId = null;
        this._anchorResizeObserver?.disconnect();
        this._anchorResizeObserver = null;
        this._observedAnchorHeights.clear();
        this._anchorScrollContainer?.removeEventListener('pointerdown', this._cancelAnchorTrackingListener);
        this._anchorScrollContainer?.removeEventListener('touchstart', this._cancelAnchorTrackingListener);
        this._anchorScrollContainer?.removeEventListener('wheel', this._cancelAnchorTrackingListener);
        this._anchorScrollContainer = null;
    }

    // #endregion
}
