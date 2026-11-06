// #region Imports

import {
    afterNextRender,
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    untracked,
    type InputSignalWithTransform,
    type InputSignal,
} from '@angular/core';
import { ViewportClearanceService } from './ViewportClearanceService';
import type { IViewportClearanceReservation } from './IViewportClearanceReservation';
import type { ViewportClearanceEdge } from './ViewportClearanceEdge';

// #endregion

/**
 * Keeps the floating surface clear of the host element, for example an open side panel or a session dock.
 * The host reserves the distance from its leading edge to the given viewport edge while it is visible.
 *
 * @public
 */
@Directive({
    selector: '[ngpViewportClearance]',
})
export class ViewportClearanceDirective {
    // #region Fields

    private readonly _clearance: ViewportClearanceService = inject(ViewportClearanceService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private _edge: ViewportClearanceEdge | null = null;
    private _reservation: IViewportClearanceReservation | null = null;
    private _isObserving = false;

    // #endregion

    // #region Ctor

    public constructor() {
        afterNextRender(() => this.observe());
        effect(() => {
            this.ngpViewportClearance();
            this.ngpViewportClearanceDisabled();
            untracked(() => {
                if (this._isObserving) {
                    this.measure();
                }
            });
        });
        this._destroyRef.onDestroy(() => this._reservation?.release());
    }

    // #endregion

    // #region Properties

    /**
     * Viewport edge the host occupies; `right` for side panels, `bottom` for docks.
     *
     * @public
     * @readonly
     */
    public readonly ngpViewportClearance: InputSignalWithTransform<ViewportClearanceEdge, ViewportClearanceEdge | ''> = input<
        ViewportClearanceEdge,
        ViewportClearanceEdge | ''
    >('right', { transform: (edge) => (edge === 'bottom' ? 'bottom' : 'right') });

    /**
     * Releases the space while the host stays mounted but is not shown, for example a closed side panel.
     *
     * @public
     * @readonly
     */
    public readonly ngpViewportClearanceDisabled: InputSignal<boolean> = input(false);

    // #endregion

    // #region Methods

    private observe(): void {
        const host = this._elementRef.nativeElement;
        const document = host.ownerDocument;
        const view = document.defaultView;
        if (!view) {
            return;
        }

        const measure = (): void => this.measure();
        // Entrance and exit motion of the host or an ancestor moves it without resizing it; measure once it settles.
        const measureAfterMotion = (event: Event): void => {
            if (event.target instanceof view.Node && event.target.contains(host)) {
                this.measure();
            }
        };
        const resizeObserver = view.ResizeObserver ? new view.ResizeObserver(measure) : null;
        resizeObserver?.observe(host);
        view.addEventListener('resize', measure);
        document.addEventListener('transitionend', measureAfterMotion, true);
        document.addEventListener('animationend', measureAfterMotion, true);
        void Promise.allSettled(host.getAnimations?.().map((animation) => animation.finished) ?? []).then(measure);
        this._destroyRef.onDestroy(() => {
            resizeObserver?.disconnect();
            view.removeEventListener('resize', measure);
            document.removeEventListener('transitionend', measureAfterMotion, true);
            document.removeEventListener('animationend', measureAfterMotion, true);
        });
        this._isObserving = true;
        this.measure();
    }

    private measure(): void {
        if (this._destroyRef.destroyed) return;
        const edge = this.ngpViewportClearance();
        if (this._reservation === null || this._edge !== edge) {
            this._reservation?.release();
            this._reservation = this._clearance.reserve(edge, this._elementRef.nativeElement);
            this._edge = edge;
        }

        const host = this._elementRef.nativeElement;
        const view = host.ownerDocument.defaultView;
        const bounds = host.getBoundingClientRect();
        if (this.ngpViewportClearanceDisabled() || !view || bounds.width === 0 || bounds.height === 0) {
            this._reservation.update(0);
            return;
        }

        this._reservation.update(edge === 'right' ? view.innerWidth - bounds.left : view.innerHeight - bounds.top);
    }

    // #endregion
}
