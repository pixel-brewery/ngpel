// #region Imports

import { ElementRef, type Signal, signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ViewSlotAnchorTargetDirective } from './ViewSlotAnchorTargetDirective';

// #endregion

/**
 * Replaces the signal inputs of a directive or component instance with signals the spec owns.
 *
 * The just-in-time compiler never sees an `input()` initialiser, so a template binding reports
 * `NG0303` and the value never reaches the directive. Substituting the field with a signal the spec
 * owns feeds exactly the reads the directive performs. Call it directly after
 * `TestBed.createComponent(...)` and before the first change detection. Because the class field is
 * replaced, an input `alias` or `transform` is no longer exercised — cover a transform by testing
 * its own module.
 */
function applySignalInputs<TTarget extends object>(
    target: TTarget,
    inputs: { readonly [TKey in keyof TTarget]?: TTarget[TKey] extends Signal<infer TValue> ? Signal<TValue> : never },
): void {
    for (const name of Object.keys(inputs) as Array<keyof TTarget & string>) {
        Object.defineProperty(target, name, { configurable: true, value: inputs[name] });
    }
}

/** A controllable `ResizeObserver`: it records the observed elements and fires notifications on demand. */
class FakeResizeObserver implements ResizeObserver {
    private readonly _callback: ResizeObserverCallback;
    private readonly _observed = new Set<Element>();

    public constructor(callback: ResizeObserverCallback) {
        this._callback = callback;
    }

    public get observedElements(): ReadonlySet<Element> {
        return this._observed;
    }

    public observe(target: Element): void {
        this._observed.add(target);
    }

    public unobserve(target: Element): void {
        this._observed.delete(target);
    }

    public disconnect(): void {
        this._observed.clear();
    }

    public takeRecords(): Array<ResizeObserverEntry> {
        return [];
    }

    public trigger(...targets: ReadonlyArray<Element>): void {
        const entries = targets
            .filter((target) => this._observed.has(target))
            .map((target) => ({
                target,
                contentRect: target.getBoundingClientRect(),
                borderBoxSize: [],
                contentBoxSize: [],
                devicePixelContentBoxSize: [],
            }));

        if (entries.length === 0) {
            return;
        }

        this._callback(entries, this);
    }
}

/** Handle returned by {@link installFakeResizeObserver}. */
interface IFakeResizeObserverInstallation {
    readonly instances: ReadonlyArray<FakeResizeObserver>;
    readonly latest: FakeResizeObserver | null;
    restore(): void;
}

/** Replaces the `ResizeObserver` global with a recording fake until `restore()` is called. */
function installFakeResizeObserver(scope: object = globalThis): IFakeResizeObserverInstallation {
    const instances: Array<FakeResizeObserver> = [];
    const previous = Object.getOwnPropertyDescriptor(scope, 'ResizeObserver');

    class InstalledResizeObserver extends FakeResizeObserver {
        public constructor(callback: ResizeObserverCallback) {
            super(callback);
            instances.push(this);
        }
    }

    Object.defineProperty(scope, 'ResizeObserver', { configurable: true, writable: true, value: InstalledResizeObserver });

    return {
        instances,
        get latest(): FakeResizeObserver | null {
            return instances.at(-1) ?? null;
        },
        restore(): void {
            if (previous) {
                Object.defineProperty(scope, 'ResizeObserver', previous);
            } else {
                Reflect.deleteProperty(scope, 'ResizeObserver');
            }
        },
    };
}

describe('ViewSlotAnchorTargetDirective', () => {
    let activeAnchor: WritableSignal<string | null>;
    let anchorRequest: WritableSignal<number>;
    let host: HTMLElement;
    let originalScrollIntoView: PropertyDescriptor | undefined;
    let precedingAnchor: HTMLElement;
    let resizeObservers: IFakeResizeObserverInstallation;
    let scrollContainer: HTMLElement;
    let scrollIntoView: ReturnType<typeof vi.fn>;
    let target: WritableSignal<string>;

    beforeEach(() => {
        vi.useFakeTimers();
        resizeObservers = installFakeResizeObserver();
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => window.setTimeout(() => callback(0)));
        vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((animationFrameId) => {
            window.clearTimeout(animationFrameId);
        });
        activeAnchor = signal<string | null>('legal-content');
        anchorRequest = signal(1);
        scrollContainer = document.createElement('div');
        scrollContainer.style.overflowY = 'auto';
        Object.defineProperty(scrollContainer, 'clientHeight', { configurable: true, value: 100 });
        Object.defineProperty(scrollContainer, 'scrollHeight', { configurable: true, value: 1_000 });
        const outlet = document.createElement('div');
        precedingAnchor = document.createElement('div');
        host = document.createElement('div');
        setElementHeight(precedingAnchor, 100);
        setElementHeight(host, 100);
        outlet.append(precedingAnchor, host);
        scrollContainer.append(outlet);
        target = signal('legal-content');
        originalScrollIntoView = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView');
        scrollIntoView = vi.fn();
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView });
        TestBed.configureTestingModule({
            providers: [ViewSlotAnchorTargetDirective, { provide: ElementRef, useValue: new ElementRef(host) }],
        });
        const directive = TestBed.inject(ViewSlotAnchorTargetDirective);
        applySignalInputs(directive, { activeAnchor, anchor: target, request: anchorRequest });
        TestBed.tick();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
        resizeObservers.restore();

        if (originalScrollIntoView) {
            Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScrollIntoView);
        } else {
            Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView');
        }
    });

    it('scrolls the active anchor into view', () => {
        // Arrange

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledOnce();
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    });

    it('scrolls again only when a new anchor navigation is requested', () => {
        // Arrange
        vi.runOnlyPendingTimers();
        scrollIntoView.mockClear();
        anchorRequest.set(2);
        TestBed.tick();

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledOnce();
    });

    it('does not recapture scrolling when the active anchor is restored without a new request', () => {
        // Arrange
        vi.runOnlyPendingTimers();
        scrollIntoView.mockClear();
        activeAnchor.set(null);
        TestBed.tick();
        activeAnchor.set('legal-content');
        TestBed.tick();

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('realigns the active anchor when preceding lazy content changes height', () => {
        // Arrange
        vi.runOnlyPendingTimers();
        scrollIntoView.mockClear();
        setElementHeight(precedingAnchor, 500);
        resizeObservers.latest?.trigger(precedingAnchor);

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledOnce();
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start', inline: 'nearest' });
    });

    it('does not replace the smooth scroll for an unchanged initial resize observation', () => {
        // Arrange
        vi.runOnlyPendingTimers();
        scrollIntoView.mockClear();
        resizeObservers.latest?.trigger(precedingAnchor);

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('stops realigning after the user scrolls manually', () => {
        // Arrange
        vi.runOnlyPendingTimers();
        scrollIntoView.mockClear();
        scrollContainer.dispatchEvent(new WheelEvent('wheel'));
        setElementHeight(precedingAnchor, 500);
        resizeObservers.latest?.trigger(precedingAnchor);

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('cancels a pending scroll when the anchor becomes inactive', () => {
        // Arrange
        activeAnchor.set(null);
        TestBed.tick();

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('cancels pending scrolling on destruction', () => {
        // Arrange
        TestBed.resetTestingModule();

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('does not track anchors when no ResizeObserver is available', () => {
        // Arrange
        resizeObservers.restore();
        Reflect.deleteProperty(globalThis, 'ResizeObserver');

        // Act
        vi.runOnlyPendingTimers();

        // Assert
        expect(scrollIntoView).toHaveBeenCalledOnce();
        expect(resizeObservers.instances).toHaveLength(0);
    });
});

function setElementHeight(element: HTMLElement, height: number): void {
    Object.defineProperty(element, 'getBoundingClientRect', {
        configurable: true,
        value: () => new DOMRect(0, 0, 100, height),
    });
}
