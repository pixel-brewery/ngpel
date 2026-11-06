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

/**
 * Coordinates an expandable generic rail with its host drawer width.
 *
 * @public
 */
export class RailDrawerController {
    // #region Fields

    private static readonly ANIMATION_DURATION = 240;
    private static readonly MAX_RAIL_WIDTH = 360;
    private static readonly VIEWPORT_SHARE = 0.45;

    private readonly _isOpen: WritableSignal<boolean> = signal(false);
    private readonly _options: IRailDrawerOptions;
    private _originalWidth: CssLength | undefined;

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
     * Expands the generic rail and its host drawer once.
     *
     * @public
     */
    public open(): void {
        if (this._isOpen()) {
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

    // #endregion
}
