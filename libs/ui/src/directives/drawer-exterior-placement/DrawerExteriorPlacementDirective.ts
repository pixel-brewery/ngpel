// #region Imports

import { DestroyRef, Directive, ElementRef, inject, Renderer2, type AfterViewInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DRAWER_REF, type IDrawerRef } from '@pixel-brewery/mosaik-elements-angular';
import { merge } from 'rxjs';

// #endregion

/**
 * Places contextual drawer content outside the drawer on its leading backdrop edge.
 *
 * The host must be projected through the drawer's Mosaik portal so drawer transforms
 * and overflow clipping cannot hide the externally positioned content.
 *
 * @public
 */
@Directive({
    selector: '[ngpDrawerExteriorPlacement]',
})
export class DrawerExteriorPlacementDirective implements AfterViewInit {
    // #region Fields

    private static readonly _exteriorGap = 24;

    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _drawerRef: IDrawerRef = inject(DRAWER_REF);
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _renderer: Renderer2 = inject(Renderer2);
    private _animationPlacementFrame: number | null = null;
    private _animationPlacementIdleFrameCount = 0;
    private _drawerMutationObserver: MutationObserver | null = null;
    private _drawerRootElement: HTMLElement | null = null;
    private _drawerRootResizeObserver: ResizeObserver | null = null;
    private _unlistenDrawerRootTransitionEnd: (() => void) | null = null;
    private _unlistenWindowResize: (() => void) | null = null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a drawer-opposite placement behavior.
     *
     * @public
     */
    public constructor() {
        this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'fixed');
        this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');

        merge(this._drawerRef.positionChanged, this._drawerRef.sizeChanged)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.place());
        this._drawerRef.closeAttempted.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.trackCloseAttemptPlacement());

        this._destroyRef.onDestroy(() => this.destroy());
    }

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    /**
     * Resolves the documented Mosaik drawer root after both Angular and Lit have rendered it.
     *
     * @public
     */
    public async ngAfterViewInit(): Promise<void> {
        await this._drawerRef.element.updateComplete;

        if (this._destroyRef.destroyed) {
            return;
        }

        this._drawerRootElement = this._drawerRef.element.shadowRoot?.querySelector<HTMLElement>('[part="root"]') ?? null;

        if (!this._drawerRootElement) {
            return;
        }

        const defaultView = this._elementRef.nativeElement.ownerDocument.defaultView;
        const ResizeObserverConstructor = defaultView?.ResizeObserver;
        const MutationObserverConstructor = defaultView?.MutationObserver;

        if (ResizeObserverConstructor) {
            this._drawerRootResizeObserver = new ResizeObserverConstructor(() => this.place());
            this._drawerRootResizeObserver.observe(this._drawerRootElement);
        }

        if (MutationObserverConstructor) {
            this._drawerMutationObserver = new MutationObserverConstructor(() => this.place());
            this._drawerMutationObserver.observe(this._drawerRef.element, {
                attributes: true,
                attributeFilter: ['dir'],
            });
        }

        this._unlistenDrawerRootTransitionEnd = this._renderer.listen(this._drawerRootElement, 'transitionend', () => this.place());

        if (defaultView) {
            this._unlistenWindowResize = this._renderer.listen(defaultView, 'resize', () => this.place());
        }

        this.trackAnimatedPlacement();
    }

    private destroy(): void {
        const defaultView = this._elementRef.nativeElement.ownerDocument.defaultView;

        if (this._animationPlacementFrame !== null) {
            defaultView?.cancelAnimationFrame(this._animationPlacementFrame);
            this._animationPlacementFrame = null;
        }

        this._drawerMutationObserver?.disconnect();
        this._drawerMutationObserver = null;
        this._drawerRootResizeObserver?.disconnect();
        this._drawerRootResizeObserver = null;
        this._drawerRootElement = null;
        this._unlistenDrawerRootTransitionEnd?.();
        this._unlistenDrawerRootTransitionEnd = null;
        this._unlistenWindowResize?.();
        this._unlistenWindowResize = null;
    }

    private place(): void {
        if (!this._drawerRootElement) {
            return;
        }

        const host = this._elementRef.nativeElement;
        this._renderer.setStyle(host, 'left', '0px');
        this._renderer.setStyle(host, 'top', '0px');
        this._renderer.setStyle(host, 'transform', 'none');

        const rootBounds = this._drawerRootElement.getBoundingClientRect();
        const hostBounds = host.getBoundingClientRect();
        const positioningOriginLeft = hostBounds.left;
        const positioningOriginTop = hostBounds.top;
        const direction = host.ownerDocument.defaultView?.getComputedStyle(this._drawerRef.element).direction ?? 'ltr';
        const isRightToLeft = direction === 'rtl';
        const targetLeft = isRightToLeft
            ? rootBounds.right + DrawerExteriorPlacementDirective._exteriorGap
            : rootBounds.left - DrawerExteriorPlacementDirective._exteriorGap - hostBounds.width;
        const targetTop = rootBounds.top + (rootBounds.height - hostBounds.height) / 2;

        this._renderer.setStyle(host, 'left', `${targetLeft - positioningOriginLeft}px`);
        this._renderer.setStyle(host, 'top', `${targetTop - positioningOriginTop}px`);
        this._renderer.setStyle(host, 'visibility', 'visible');
    }

    private placeAnimationFrame(): void {
        this._animationPlacementFrame = null;

        if (this._destroyRef.destroyed || !this._drawerRootElement) {
            return;
        }

        this.place();

        const animations = typeof this._drawerRootElement.getAnimations === 'function' ? this._drawerRootElement.getAnimations() : [];
        const hasActiveAnimation = animations.some((animation) => animation.pending || animation.playState === 'running');

        this._animationPlacementIdleFrameCount = hasActiveAnimation ? 0 : this._animationPlacementIdleFrameCount + 1;

        if (hasActiveAnimation || this._animationPlacementIdleFrameCount < 2) {
            this.scheduleAnimationPlacementFrame();
        }
    }

    private scheduleAnimationPlacementFrame(): void {
        if (this._animationPlacementFrame !== null) {
            return;
        }

        const defaultView = this._elementRef.nativeElement.ownerDocument.defaultView;

        if (!defaultView) {
            return;
        }

        this._animationPlacementFrame = defaultView.requestAnimationFrame(() => this.placeAnimationFrame());
    }

    private trackAnimatedPlacement(): void {
        this._animationPlacementIdleFrameCount = 0;
        this.place();
        this.scheduleAnimationPlacementFrame();
    }

    private trackCloseAttemptPlacement(): void {
        this.trackAnimatedPlacement();

        const defaultView = this._elementRef.nativeElement.ownerDocument.defaultView;

        defaultView?.queueMicrotask(() => {
            if (!this._destroyRef.destroyed) {
                this.trackAnimatedPlacement();
            }
        });
    }

    // #endregion
}
