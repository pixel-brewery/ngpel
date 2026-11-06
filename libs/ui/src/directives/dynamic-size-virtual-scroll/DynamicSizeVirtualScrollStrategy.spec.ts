// #region Imports

import type { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DynamicSizeVirtualScrollStrategy } from './DynamicSizeVirtualScrollStrategy';

// #endregion

class TestResizeObserver implements ResizeObserver {
    // #region Fields

    public static latest: TestResizeObserver | null = null;

    public readonly disconnect = vi.fn();
    public readonly observe = vi.fn();
    public readonly unobserve = vi.fn();

    private readonly _callback: ResizeObserverCallback;

    // #endregion

    // #region Ctor

    public constructor(callback: ResizeObserverCallback) {
        this._callback = callback;
        TestResizeObserver.latest = this;
    }

    // #endregion

    // #region Methods

    public trigger(entries: ReadonlyArray<ResizeObserverEntry>): void {
        this._callback([...entries], this);
    }

    // #endregion
}

interface IVirtualScrollViewportFixture {
    readonly viewport: CdkVirtualScrollViewport;
    readonly renderedOffsets: Array<number>;
    readonly renderedRanges: Array<{ start: number; end: number }>;
    readonly scrollToOffsets: Array<number>;
    readonly totalSizes: Array<number>;
    readonly setScrollOffset: (offset: number) => void;
}

describe('dynamic-size virtual scrolling', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
        TestResizeObserver.latest = null;
    });

    it('keeps the first visible item anchored when an earlier item changes height', () => {
        // arrange
        vi.stubGlobal('ResizeObserver', TestResizeObserver);
        const first = createVirtualItem('a', 0, 100);
        const second = createVirtualItem('b', 1, 300);
        const fixture = createViewportFixture([first, second]);
        const strategy = new DynamicSizeVirtualScrollStrategy();
        const scrolledIndexes: Array<number> = [];
        strategy.scrolledIndexChange.subscribe((index) => scrolledIndexes.push(index));
        strategy.attach(fixture.viewport);
        strategy.update(['a', 'b', 'c', 'd', 'e', 'f'], 240, 0);
        strategy.onDataLengthChanged();
        strategy.onContentRendered();
        fixture.setScrollOffset(650);
        strategy.onContentScrolled();

        // act
        TestResizeObserver.latest?.trigger([createResizeEntry(first, 180)]);

        // assert
        expect(fixture.totalSizes).toContain(1_200);
        expect(fixture.totalSizes.at(-1)).toBe(1_440);
        expect(fixture.renderedRanges).toContainEqual({ start: 3, end: 5 });
        expect(fixture.renderedOffsets).toContain(600);
        expect(scrolledIndexes).toContain(3);
        expect(fixture.scrollToOffsets.at(-1)).toBe(730);
    });

    it('retains measured sizes by stable key when items are reordered', () => {
        // arrange
        vi.stubGlobal('ResizeObserver', TestResizeObserver);
        const first = createVirtualItem('a', 0, 100);
        const second = createVirtualItem('b', 1, 300);
        const fixture = createViewportFixture([first, second]);
        const strategy = new DynamicSizeVirtualScrollStrategy();
        strategy.attach(fixture.viewport);
        strategy.update(['a', 'b', 'c', 'd', 'e', 'f'], 240, 0);
        strategy.onContentRendered();

        // act
        strategy.update(['b', 'a', 'c', 'd', 'e', 'f'], 240, 0);
        TestResizeObserver.latest?.trigger([createResizeEntry(first, 700)]);
        strategy.scrollToIndex(1, 'auto');

        // assert
        expect(fixture.scrollToOffsets.at(-1)).toBe(300);
        strategy.detach();
        expect(TestResizeObserver.latest?.disconnect).toHaveBeenCalledOnce();
    });

    it('remains pinned to the end while final item estimates settle', () => {
        // arrange
        vi.stubGlobal('ResizeObserver', TestResizeObserver);
        const first = createVirtualItem('a', 0, 100);
        const second = createVirtualItem('b', 1, 300);
        const fixture = createViewportFixture([first, second]);
        const strategy = new DynamicSizeVirtualScrollStrategy();
        strategy.attach(fixture.viewport);
        strategy.update(['a', 'b', 'c', 'd', 'e', 'f'], 240, 0);
        strategy.onContentRendered();
        fixture.setScrollOffset(900);
        strategy.onContentScrolled();

        // act
        TestResizeObserver.latest?.trigger([createResizeEntry(second, 400)]);

        // assert
        expect(fixture.totalSizes.at(-1)).toBe(1_500);
        expect(fixture.scrollToOffsets.at(-1)).toBe(1_200);
    });
});

function createResizeEntry(target: HTMLElement, height: number): ResizeObserverEntry {
    setElementHeight(target, height);

    return {
        target,
        contentRect: new DOMRect(0, 0, 100, height),
    } as unknown as ResizeObserverEntry;
}

function createViewportFixture(rendered: ReadonlyArray<HTMLElement>): IVirtualScrollViewportFixture {
    let scrollOffset = 0;
    const renderedRanges: Array<{ start: number; end: number }> = [];
    const renderedOffsets: Array<number> = [];
    const totalSizes: Array<number> = [];
    const scrollToOffsets: Array<number> = [];
    const host = document.createElement('div');
    host.append(...rendered);
    const viewport = {
        elementRef: { nativeElement: host },
        getDataLength: () => 6,
        getViewportSize: () => 300,
        measureScrollOffset: () => scrollOffset,
        setRenderedRange: (range: { start: number; end: number }) => renderedRanges.push(range),
        setRenderedContentOffset: (offset: number) => renderedOffsets.push(offset),
        setTotalContentSize: (size: number) => totalSizes.push(size),
        scrollToOffset: (offset: number) => {
            scrollOffset = offset;
            scrollToOffsets.push(offset);
        },
    } as unknown as CdkVirtualScrollViewport;

    return {
        viewport,
        renderedRanges,
        renderedOffsets,
        scrollToOffsets,
        totalSizes,
        setScrollOffset: (offset: number) => {
            scrollOffset = offset;
        },
    };
}

function createVirtualItem(key: string, index: number, height: number): HTMLElement {
    const item = document.createElement('article');
    item.dataset['ngpVirtualScrollIndex'] = String(index);
    item.dataset['ngpVirtualScrollKey'] = key;
    setElementHeight(item, height);
    return item;
}

function setElementHeight(element: HTMLElement, height: number): void {
    Object.defineProperty(element, 'getBoundingClientRect', {
        configurable: true,
        value: () => new DOMRect(0, 0, 100, height),
    });
}
