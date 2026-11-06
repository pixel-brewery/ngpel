// #region Imports

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    PLATFORM_ID,
    Renderer2,
    signal,
    untracked,
    type InputSignal,
    type Signal,
} from '@angular/core';

// #endregion

const ACTIVITY_EVENT_NAMES: ReadonlyArray<string> = ['pointermove', 'pointerdown', 'wheel', 'keydown', 'focusin', 'focusout'];

/**
 * Reports pointer inactivity on its host.
 *
 * Pointer, wheel, keyboard and focus activity on the host restarts a UI timer. When the timer
 * elapses, the host is reported idle unless the pointer rests on a hold region or a hold region
 * contains visible keyboard focus. Devices without hover capability are never reported idle.
 *
 * @example
 * ```html
 * <section ngpPointerIdle #idle="ngpPointerIdle" [attr.data-idle]="idle.isIdle() ? '' : null">
 *     <footer part="footer">…</footer>
 * </section>
 * ```
 *
 * @public
 */
@Directive({
    selector: '[ngpPointerIdle]',
    exportAs: 'ngpPointerIdle',
})
export class PointerIdleDirective {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _renderer: Renderer2 = inject(Renderer2);
    private readonly _isIdle = signal(false);
    private readonly _isHoverCapable: boolean;
    private _isPointerWithinHold = false;
    private _timer: ReturnType<typeof setTimeout> | null = null;

    // #endregion

    // #region Ctor

    /**
     * Observes host activity on hover-capable browsers and follows the disabled state.
     *
     * @public
     */
    public constructor() {
        this._isHoverCapable = isPlatformBrowser(inject(PLATFORM_ID)) && this.resolveHoverCapability();
        const removeListeners = this._isHoverCapable ? this.listen() : [];

        effect(() => {
            const disabled = this.disabled();

            untracked(() => {
                if (disabled) {
                    this.suspend();
                } else {
                    this.restartTimer();
                }
            });
        });

        inject(DestroyRef).onDestroy(() => {
            removeListeners.forEach((removeListener) => removeListener());
            this.clearTimer();
        });
    }

    // #endregion

    // #region Properties

    /**
     * Inactivity in milliseconds before the host is reported idle.
     *
     * @public
     * @readonly
     */
    public readonly timeout: InputSignal<number> = input<number>(3000, { alias: 'ngpPointerIdleTimeout' });

    /**
     * Suspends idle detection; the host is reported active while it is disabled.
     *
     * @public
     * @readonly
     */
    public readonly disabled: InputSignal<boolean> = input<boolean>(false, { alias: 'ngpPointerIdleDisabled' });

    /**
     * CSS selector list of regions that keep the host active while hovered or keyboard-focused.
     *
     * @public
     * @readonly
     */
    public readonly hold: InputSignal<null | string> = input<null | string>(null, { alias: 'ngpPointerIdleHold' });

    /**
     * Indicates whether the host is currently idle.
     *
     * @public
     * @readonly
     */
    public get isIdle(): Signal<boolean> {
        return this._isIdle.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Determines whether the browser's primary pointer can hover.
     *
     * @private
     * @returns `true` unless the browser reports a primary pointer without hover, such as touch.
     */
    private resolveHoverCapability(): boolean {
        const view = this._document.defaultView;

        if (view === null) {
            return false;
        }

        return !(view.matchMedia?.('(hover: none)')?.matches ?? false);
    }

    /**
     * Registers activity and hold-region listeners on the host.
     *
     * @private
     * @returns Functions that remove the registered listeners.
     */
    private listen(): Array<() => void> {
        const host = this._elementRef.nativeElement;
        const removeListeners = ACTIVITY_EVENT_NAMES.map((eventName) => this._renderer.listen(host, eventName, () => this.onActivity(), { passive: true }));

        removeListeners.push(
            this._renderer.listen(host, 'pointerover', (event: PointerEvent) => {
                this.updatePointerHold(event.target);
            }),
            this._renderer.listen(host, 'pointerout', (event: PointerEvent) => {
                this.updatePointerHold(event.relatedTarget);
            }),
        );

        return removeListeners;
    }

    private updatePointerHold(target: EventTarget | null): void {
        const withinHold = this.isWithinHold(target);
        if (this._isPointerWithinHold !== withinHold) {
            this._isPointerWithinHold = withinHold;
            this.onActivity();
        }
    }

    /**
     * Restores the active state and restarts the inactivity timer.
     *
     * @private
     */
    private onActivity(): void {
        this._isIdle.set(false);
        this.restartTimer();
    }

    /**
     * Reports the host idle unless detection is suspended or a hold region keeps it active.
     *
     * @private
     */
    private onTimeout(): void {
        this._timer = null;

        if (this.disabled() || this._isPointerWithinHold || this.hasVisibleFocusWithinHold()) {
            return;
        }

        this._isIdle.set(true);
    }

    /**
     * Starts a fresh inactivity timer when detection is available and enabled.
     *
     * @private
     */
    private restartTimer(): void {
        this.clearTimer();

        if (!this._isHoverCapable || this.disabled()) {
            return;
        }

        this._timer = setTimeout(() => this.onTimeout(), Math.max(0, this.timeout()));
    }

    /**
     * Stops the timer and reports the host active.
     *
     * @private
     */
    private suspend(): void {
        this.clearTimer();
        this._isIdle.set(false);
    }

    /**
     * Cancels a pending inactivity timer.
     *
     * @private
     */
    private clearTimer(): void {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    /**
     * Checks whether keyboard focus is visibly placed inside a hold region.
     *
     * @private
     * @returns `true` when a hold region contains `:focus-visible` focus.
     */
    private hasVisibleFocusWithinHold(): boolean {
        const activeElement = this._document.activeElement;

        if (!this.isWithinHold(activeElement)) {
            return false;
        }

        let focusedElement: Element | null = activeElement;

        while (focusedElement?.shadowRoot?.activeElement) {
            focusedElement = focusedElement.shadowRoot.activeElement;
        }

        return focusedElement?.matches(':focus-visible') ?? false;
    }

    /**
     * Checks whether a node belongs to one of the host's hold regions.
     *
     * @param target - Event target or focused element.
     * @private
     * @returns `true` when the node is inside a hold region of this host.
     */
    private isWithinHold(target: EventTarget | null): boolean {
        const hold = this.hold();

        if (hold === null || !(target instanceof Element)) {
            return false;
        }

        const region = target.closest(hold);

        return region !== null && this._elementRef.nativeElement.contains(region);
    }

    // #endregion
}
