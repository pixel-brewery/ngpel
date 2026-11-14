// #region Imports

import { signal, type Signal, type WritableSignal } from '@angular/core';
import type { CssLength } from '@pixel-brewery/mosaik-themes';

// #endregion

interface IRailDrawerElement extends HTMLElement {
    innerOffsetWidth(): number;
}

interface IRailDrawerOptions {
    readonly element: IRailDrawerElement;
    readonly readWidth: () => CssLength | undefined;
    readonly setWidth: (width: CssLength) => void;
}

interface IRailScrollClearance {
    readonly element: HTMLElement;
    readonly paddingBottom: string;
}

interface IRailInlineStyles {
    readonly rail: HTMLElement;
    readonly values: ReadonlyArray<readonly [property: string, value: string, priority: string]>;
}

/**
 * Coordinates a generic rail with its host drawer: the docked rail expands the drawer
 * for its content, the floating rail gives its column back to the drawer body and
 * anchors the floating actions above the drawer footer.
 *
 * @public
 */
export class RailDrawerController {
    // #region Fields

    private static readonly ANIMATION_DURATION = 240;
    private static readonly FLOATING_OFFSET_PROPERTY = '--rail-floating-offset';
    private static readonly FLOATING_RAIL_STYLES: ReadonlyArray<readonly [string, string]> = [
        ['--drawer-rail-width', '0px'],
        ['--drawer-rail-divider-width', '0px'],
        ['--drawer-rail-padding-top', '0px'],
        ['--drawer-rail-padding-right', '0px'],
        ['--drawer-rail-padding-bottom', '0px'],
        ['--drawer-rail-padding-left', '0px'],
        ['overflow', 'visible'],
    ];
    private static readonly MAX_RAIL_WIDTH = 360;
    private static readonly SCROLL_CONTAINER_SEARCH_DEPTH = 12;
    private static readonly VIEWPORT_SHARE = 0.45;

    private readonly _isOpen: WritableSignal<boolean> = signal(false);
    private readonly _options: IRailDrawerOptions;
    private _arrangementFrame: number | null = null;
    private _floatingLayer: HTMLElement | null = null;
    private _railInlineStyles: IRailInlineStyles | null = null;
    private _mutationObserver: MutationObserver | null = null;
    private _originalWidth: CssLength | undefined;
    private _resizeObserver: ResizeObserver | null = null;
    private _scrollClearance: IRailScrollClearance | null = null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a controller for one host drawer.
     *
     * @param options - Drawer element and width accessors.
     * @public
     */
    public constructor(options: IRailDrawerOptions) {
        this._options = options;
    }

    // #endregion

    // #region Properties

    /**
     * Indicates whether expanded rail content is visible.
     *
     * @public
     * @readonly
     */
    public get isOpen(): Signal<boolean> {
        return this._isOpen.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Expands the docked rail and its host drawer once. A floating rail never widens
     * the drawer because its content opens in a sheet instead.
     *
     * @public
     */
    public open(): void {
        if (this._isOpen() || this._floatingLayer !== null) {
            return;
        }

        this._isOpen.set(true);
        this._originalWidth = this._options.readWidth();

        const drawerElement = this._options.element;
        const viewportWidth = drawerElement.ownerDocument.defaultView?.innerWidth ?? drawerElement.clientWidth;
        const railWidth = Math.min(RailDrawerController.MAX_RAIL_WIDTH, Math.max(0, Math.floor(viewportWidth * RailDrawerController.VIEWPORT_SHARE)));
        drawerElement.querySelector('mosaik-drawer-rail')?.style.setProperty('--drawer-rail-width', `${railWidth}px`);
        drawerElement.style.setProperty('--drawer-transition-duration', `${RailDrawerController.ANIMATION_DURATION}ms`);
        drawerElement.style.setProperty('--drawer-transition-mode', 'ease');
        drawerElement.style.setProperty('--drawer-transition-property', 'width, max-width');

        const currentWidth = drawerElement.innerOffsetWidth();
        if (currentWidth <= 0 || viewportWidth <= 0 || currentWidth >= viewportWidth) {
            return;
        }

        this._options.setWidth(`${Math.min(currentWidth + railWidth, viewportWidth)}px`);
    }

    /**
     * Restores the compact rail and the drawer's original width.
     *
     * @public
     */
    public close(): void {
        if (!this._isOpen()) {
            return;
        }

        this._isOpen.set(false);
        this._options.setWidth(this._originalWidth ?? 'auto');
        this._options.element.querySelector('mosaik-drawer-rail')?.style.removeProperty('--drawer-rail-width');
        this._originalWidth = undefined;
    }

    /**
     * Gives the rail column back to the drawer body and keeps the supplied layer anchored
     * above the drawer footer, independent of the scroll position. The scroll container
     * beneath the layer reserves room so its last content can be scrolled clear of it.
     *
     * @param layer - Element that carries the floating rail actions.
     * @public
     */
    public float(layer: HTMLElement): void {
        if (this._floatingLayer === layer) {
            return;
        }

        this.dock();
        this.close();
        this._floatingLayer = layer;

        const rail = this._options.element.querySelector<HTMLElement>('mosaik-drawer-rail');
        if (rail) {
            this._railInlineStyles = {
                rail,
                values: RailDrawerController.FLOATING_RAIL_STYLES.map(([property]) => [
                    property,
                    rail.style.getPropertyValue(property),
                    rail.style.getPropertyPriority(property),
                ]),
            };
            for (const [property, value] of RailDrawerController.FLOATING_RAIL_STYLES) {
                rail.style.setProperty(property, value);
            }
        }

        this.observeArrangement(layer);
        this.arrange();
    }

    /**
     * Restores the docked rail column and releases everything the floating layer reserved.
     *
     * @public
     */
    public dock(): void {
        const layer = this._floatingLayer;
        if (layer === null) {
            return;
        }

        this._floatingLayer = null;
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        this._mutationObserver?.disconnect();
        this._mutationObserver = null;
        if (this._arrangementFrame !== null) {
            layer.ownerDocument.defaultView?.cancelAnimationFrame(this._arrangementFrame);
            this._arrangementFrame = null;
        }

        this.restoreScrollClearance();
        layer.style.removeProperty(RailDrawerController.FLOATING_OFFSET_PROPERTY);

        if (this._railInlineStyles) {
            const { rail, values } = this._railInlineStyles;
            for (const [property, value, priority] of values) {
                rail.style.setProperty(property, value, priority);
            }
            this._railInlineStyles = null;
        }
    }

    private static intersects(first: DOMRect, second: DOMRect): boolean {
        return first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
    }

    private observeArrangement(layer: HTMLElement): void {
        const view = layer.ownerDocument.defaultView;
        const content = this._options.element.querySelector<HTMLElement>('mosaik-drawer-content');

        if (view?.ResizeObserver) {
            this._resizeObserver = new view.ResizeObserver(() => this.scheduleArrangement());
            this._resizeObserver.observe(layer, { box: 'border-box' });
            if (content) {
                this._resizeObserver.observe(content, { box: 'border-box' });
            }
        }

        if (content && view?.MutationObserver) {
            this._mutationObserver = new view.MutationObserver(() => this.scheduleArrangement());
            this._mutationObserver.observe(content, { childList: true, subtree: true });
        }
    }

    private scheduleArrangement(): void {
        const view = this._options.element.ownerDocument.defaultView;
        if (!view || this._arrangementFrame !== null) {
            return;
        }

        this._arrangementFrame = view.requestAnimationFrame(() => {
            this._arrangementFrame = null;
            this.arrange();
        });
    }

    private arrange(): void {
        const layer = this._floatingLayer;
        const rail = this._options.element.querySelector('mosaik-drawer-rail');
        if (layer === null || !rail) {
            return;
        }

        this.restoreScrollClearance();

        // The layer is positioned against the collapsed rail, which spans the whole drawer
        // height. Lifting it by the footer height anchors it to the end of the main region.
        const content = this._options.element.querySelector<HTMLElement>('mosaik-drawer-content');
        const contentEnd = content ? this.resolveContentEnd(content) : rail.getBoundingClientRect().bottom;
        const footerHeight = Math.max(0, rail.getBoundingClientRect().bottom - contentEnd);
        layer.style.setProperty(RailDrawerController.FLOATING_OFFSET_PROPERTY, `${footerHeight}px`);

        const layerBounds = layer.getBoundingClientRect();
        if (!content || layerBounds.height <= 0) {
            return;
        }

        const scrollContainer = this.resolveScrollContainer(content, layerBounds);
        const gap = Math.max(0, contentEnd - layerBounds.bottom);
        const clearance = scrollContainer.getBoundingClientRect().bottom - layerBounds.top + gap;
        if (clearance <= 0) {
            return;
        }

        this._scrollClearance = { element: scrollContainer, paddingBottom: scrollContainer.style.paddingBottom };
        scrollContainer.style.setProperty('padding-bottom', `${Math.ceil(clearance)}px`);
    }

    private restoreScrollClearance(): void {
        const clearance = this._scrollClearance;
        if (clearance === null) {
            return;
        }

        this._scrollClearance = null;
        if (clearance.paddingBottom) {
            clearance.element.style.setProperty('padding-bottom', clearance.paddingBottom);
        } else {
            clearance.element.style.removeProperty('padding-bottom');
        }
    }

    /**
     * Resolves the lower edge of the drawer's main region, which ends where the
     * drawer actions and footer begin.
     */
    private resolveContentEnd(content: HTMLElement): number {
        const style = content.ownerDocument.defaultView?.getComputedStyle(content);
        const marginBottom = Number.parseFloat(style?.marginBottom ?? '') || 0;

        return content.getBoundingClientRect().bottom + marginBottom;
    }

    /**
     * Resolves the scroll container whose viewport lies beneath the floating layer. The
     * drawer content itself is the container when it scrolls, and the safe fallback when
     * no nested scroll container can be found.
     */
    private resolveScrollContainer(content: HTMLElement, layerBounds: DOMRect): HTMLElement {
        const view = content.ownerDocument.defaultView;
        if (!view || content.scrollHeight > content.clientHeight + 1) {
            return content;
        }

        let level: Element[] = Array.from(content.children);
        for (let depth = 0; depth < RailDrawerController.SCROLL_CONTAINER_SEARCH_DEPTH && level.length > 0; depth++) {
            const next: Element[] = [];
            for (const element of level) {
                if (!(element instanceof view.HTMLElement)) {
                    continue;
                }

                const style = view.getComputedStyle(element);
                if (style.display === 'none') {
                    continue;
                }

                // Hosts without a box of their own (display: contents, inline wrappers) still
                // lead to their children; only a real box can be ruled out by its position.
                const bounds = element.getBoundingClientRect();
                const hasBox = bounds.width > 0 && bounds.height > 0;
                if (hasBox && !RailDrawerController.intersects(bounds, layerBounds)) {
                    continue;
                }

                if (hasBox && ['auto', 'scroll', 'overlay'].includes(style.overflowY)) {
                    return element;
                }

                next.push(...Array.from(element.children));
            }
            level = next;
        }

        return content;
    }

    // #endregion
}
