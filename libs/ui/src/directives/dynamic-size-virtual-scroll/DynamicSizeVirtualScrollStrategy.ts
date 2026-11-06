// #region Imports

import type { CdkVirtualScrollViewport, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Subject, type Observable } from 'rxjs';

// #endregion

const VIRTUAL_ITEM_SELECTOR = '[data-ngp-virtual-scroll-index]';
const VIRTUAL_ITEM_INDEX_DATA_KEY = 'ngpVirtualScrollIndex';
const VIRTUAL_ITEM_KEY_DATA_KEY = 'ngpVirtualScrollKey';

/**
 * Virtual-scroll strategy for lists whose rendered items have different and changing block sizes.
 *
 * @public
 */
export class DynamicSizeVirtualScrollStrategy implements VirtualScrollStrategy {
    // #region Fields

    private readonly _scrolledIndex = new Subject<number>();
    private readonly _sizeByKey = new Map<string, number>();
    private readonly _observedElements = new Map<HTMLElement, string>();
    private readonly _resizeObserver: ResizeObserver | null;
    private _viewport?: CdkVirtualScrollViewport;
    private _keys: ReadonlyArray<string> = [];
    private _prefixOffsets: ReadonlyArray<number> = [0];
    private _estimatedItemSize = 240;
    private _averageItemSize = 240;
    private _bufferSize = 720;
    private _firstVisibleIndex = 0;

    // #endregion

    // #region Ctor

    /**
     * Constructs a strategy that observes later size changes when the runtime supports `ResizeObserver`.
     *
     * @public
     */
    public constructor() {
        const ResizeObserverConstructor = globalThis.ResizeObserver;
        this._resizeObserver = ResizeObserverConstructor ? new ResizeObserverConstructor((entries) => this.recordObservedSizes(entries)) : null;
    }

    // #endregion

    // #region Properties

    /**
     * Emits the first visible logical item index.
     *
     * @public
     * @readonly
     */
    public readonly scrolledIndexChange: Observable<number> = this._scrolledIndex.asObservable();

    // #endregion

    // #region Methods

    /**
     * Updates the ordered keys and sizing configuration.
     *
     * @param keys - Stable item keys in display order.
     * @param estimatedItemSize - Initial block size for unmeasured items.
     * @param bufferSize - Overscan in pixels before and after the viewport.
     * @public
     */
    public update(keys: ReadonlyArray<string>, estimatedItemSize: number, bufferSize: number): void {
        this._keys = [...keys];
        this._estimatedItemSize = Math.max(1, estimatedItemSize);
        this._bufferSize = Math.max(0, bufferSize);
        this.pruneMeasurements();
        this.rebuildOffsets();
        this.updateViewport();
    }

    /**
     * Attaches the CDK viewport controlled by this strategy.
     *
     * @param viewport - Viewport to control.
     * @public
     */
    public attach(viewport: CdkVirtualScrollViewport): void {
        this._viewport = viewport;
        this.updateViewport();
    }

    /**
     * Releases the attached viewport and observed elements.
     *
     * @public
     */
    public detach(): void {
        this._resizeObserver?.disconnect();
        this._observedElements.clear();
        this._viewport = undefined;
    }

    /**
     * Recalculates the rendered range after scrolling.
     *
     * @public
     */
    public onContentScrolled(): void {
        this.updateViewport();
    }

    /**
     * Recalculates the rendered range after a data-length change.
     *
     * @public
     */
    public onDataLengthChanged(): void {
        this.updateViewport();
    }

    /**
     * Measures and observes the items in the latest rendered range.
     *
     * @public
     */
    public onContentRendered(): void {
        this.observeRenderedItems();
        this.measureRenderedItems();
    }

    /**
     * Handles a rendered-content offset change required by the CDK strategy contract.
     *
     * @public
     */
    public onRenderedOffsetChanged(): void {
        return;
    }

    /**
     * Scrolls to a logical item using measured and estimated sizes.
     *
     * @param index - Zero-based logical item index.
     * @param behavior - Browser scroll behavior.
     * @public
     */
    public scrollToIndex(index: number, behavior: ScrollBehavior): void {
        this._viewport?.scrollToOffset(this.offsetForIndex(index), behavior);
    }

    private indexForOffset(offset: number): number {
        if (this._keys.length === 0) {
            return 0;
        }

        const boundedOffset = Math.max(0, offset);
        let lowerBound = 0;
        let upperBound = this._keys.length;

        while (lowerBound < upperBound) {
            const middle = Math.floor((lowerBound + upperBound) / 2);

            if ((this._prefixOffsets[middle + 1] ?? 0) <= boundedOffset) {
                lowerBound = middle + 1;
            } else {
                upperBound = middle;
            }
        }

        return Math.min(lowerBound, this._keys.length - 1);
    }

    private itemSize(index: number): number {
        const key = this._keys[index];
        return key ? (this._sizeByKey.get(key) ?? this._averageItemSize) : this._estimatedItemSize;
    }

    private measureRenderedItems(): void {
        this.recordSizes([...this._observedElements.keys()].map((target) => ({ target })));
    }

    private observeRenderedItems(): void {
        if (!this._viewport) {
            return;
        }

        const renderedElements = new Set(this._viewport.elementRef.nativeElement.querySelectorAll<HTMLElement>(VIRTUAL_ITEM_SELECTOR));

        for (const element of this._observedElements.keys()) {
            if (renderedElements.has(element)) {
                continue;
            }

            this._resizeObserver?.unobserve(element);
            this._observedElements.delete(element);
        }

        for (const element of renderedElements) {
            const key = element.dataset[VIRTUAL_ITEM_KEY_DATA_KEY];

            if (!key || this._observedElements.get(element) === key) {
                continue;
            }

            this._observedElements.set(element, key);
            this._resizeObserver?.observe(element);
        }
    }

    private offsetForIndex(index: number): number {
        const boundedIndex = Math.max(0, Math.min(index, this._keys.length));
        return this._prefixOffsets[boundedIndex] ?? 0;
    }

    private parseMargin(value: string): number {
        const margin = Number.parseFloat(value);
        return Number.isFinite(margin) ? margin : 0;
    }

    private pruneMeasurements(): void {
        const currentKeys = new Set(this._keys);

        for (const key of this._sizeByKey.keys()) {
            if (!currentKeys.has(key)) {
                this._sizeByKey.delete(key);
            }
        }
    }

    private rebuildOffsets(): void {
        const measuredSizes = this._keys.map((key) => this._sizeByKey.get(key)).filter((size): size is number => size !== undefined);
        this._averageItemSize = measuredSizes.length ? measuredSizes.reduce((total, size) => total + size, 0) / measuredSizes.length : this._estimatedItemSize;

        const offsets: Array<number> = [0];

        for (let index = 0; index < this._keys.length; index += 1) {
            offsets.push((offsets[index] ?? 0) + this.itemSize(index));
        }

        this._prefixOffsets = offsets;
    }

    private recordObservedSizes(entries: ReadonlyArray<ResizeObserverEntry>): void {
        this.recordSizes(entries);
    }

    private recordSizes(entries: ReadonlyArray<{ readonly target: Element }>): void {
        if (!this._viewport || entries.length === 0) {
            return;
        }

        const previousTotalSize = this.totalContentSize();
        const wasAtEnd = this._viewport.measureScrollOffset() + this._viewport.getViewportSize() >= previousTotalSize - 1;
        const defaultSize = this._averageItemSize;
        let changed = false;
        let leadingDelta = 0;

        for (const entry of entries) {
            const element = entry.target as HTMLElement;
            const key = element.dataset[VIRTUAL_ITEM_KEY_DATA_KEY];
            const index = Number(element.dataset[VIRTUAL_ITEM_INDEX_DATA_KEY]);

            if (!key || !Number.isInteger(index) || index < 0 || this._keys[index] !== key) {
                continue;
            }

            const style = element.ownerDocument.defaultView?.getComputedStyle(element);
            const size =
                element.getBoundingClientRect().height + this.parseMargin(style?.marginBlockStart ?? '0') + this.parseMargin(style?.marginBlockEnd ?? '0');

            if (!Number.isFinite(size) || size <= 0) {
                continue;
            }

            const previousSize = this._sizeByKey.get(key) ?? defaultSize;

            if (Math.abs(previousSize - size) < 0.5) {
                continue;
            }

            this._sizeByKey.set(key, size);
            changed = true;

            if (index < this._firstVisibleIndex) {
                leadingDelta += size - previousSize;
            }
        }

        if (!changed) {
            return;
        }

        this.rebuildOffsets();

        if (wasAtEnd) {
            this.updateViewport();
            this._viewport.scrollToOffset(Math.max(0, this.totalContentSize() - this._viewport.getViewportSize()));
            this.updateViewport();
            return;
        }

        if (leadingDelta !== 0) {
            this._viewport.scrollToOffset(Math.max(0, this._viewport.measureScrollOffset() + leadingDelta));
        }

        this.updateViewport();
    }

    private totalContentSize(): number {
        return this._prefixOffsets.at(-1) ?? 0;
    }

    private updateViewport(): void {
        if (!this._viewport) {
            return;
        }

        const dataLength = Math.min(this._viewport.getDataLength(), this._keys.length);

        if (dataLength === 0) {
            this._viewport.setTotalContentSize(0);
            this._viewport.setRenderedRange({ start: 0, end: 0 });
            this._viewport.setRenderedContentOffset(0);
            return;
        }

        const scrollOffset = this._viewport.measureScrollOffset();
        const firstVisibleIndex = this.indexForOffset(scrollOffset);
        const start = Math.min(dataLength - 1, this.indexForOffset(Math.max(0, scrollOffset - this._bufferSize)));
        const end = Math.min(dataLength, this.indexForOffset(scrollOffset + this._viewport.getViewportSize() + this._bufferSize) + 1);

        this._viewport.setTotalContentSize(this.offsetForIndex(dataLength));
        this._viewport.setRenderedRange({ start, end: Math.min(dataLength, Math.max(start + 1, end)) });
        this._viewport.setRenderedContentOffset(this.offsetForIndex(start));

        if (firstVisibleIndex !== this._firstVisibleIndex) {
            this._firstVisibleIndex = firstVisibleIndex;
            this._scrolledIndex.next(firstVisibleIndex);
        }
    }

    // #endregion
}
