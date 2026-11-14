// #region Imports

import { type AfterViewInit, DestroyRef, Directive, effect, ElementRef, inject, input, type OnInit, Renderer2 } from '@angular/core';
import type { HoverRevealTarget } from './HoverRevealTarget';
import type { IHasElementRef } from './IHasElementRef';

// #endregion

/**
 * Reveals its host element when the specified area is hovered or receives focus.
 *
 * Attach this directive to an element that should remain hidden until a related area receives
 * pointer or keyboard focus. Typical use cases are row-level action buttons in tables or cards
 * whose actions appear contextually.
 *
 * The directive preserves the host's layout while coordinating opacity and pointer events, so the
 * host remains focusable and keyboard focus can reveal it. On devices whose primary pointer
 * cannot hover, the host stays visible and can be tapped directly.
 *
 * @example
 * ```html
 * <tr #row>
 *     <td>
 *         <div [ngpHoverRevealFor]="row">
 *             <button type="button">Delete</button>
 *         </div>
 *     </td>
 * </tr>
 * ```
 *
 * @public
 */
@Directive({
    selector: '[ngpHoverRevealFor]',
    exportAs: 'ngpHoverRevealFor',
})
export class HoverRevealForDirective implements OnInit, AfterViewInit {
    // #region Fields

    private readonly _host: HTMLElement;
    private readonly _noHoverQuery: MediaQueryList | undefined;
    private readonly _renderer: Renderer2;
    private _cleanups: Array<() => void> = [];
    private _isPointerWithin = false;
    private _hasFocusWithin = false;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `HoverRevealForDirective` class.
     *
     * @public
     * @param elementRef The host element that is revealed.
     * @param renderer The renderer used to listen and to apply the visual state.
     * @param destroyRef The destruction lifecycle used to release listeners.
     */
    public constructor(
        elementRef: ElementRef<HTMLElement> = inject(ElementRef),
        renderer: Renderer2 = inject(Renderer2),
        destroyRef: DestroyRef = inject(DestroyRef),
    ) {
        this._host = elementRef.nativeElement;
        this._renderer = renderer;
        this._noHoverQuery = this._host.ownerDocument.defaultView?.matchMedia?.('(hover: none)');
        const updateHoverCapability = (): void => this.updateVisibility();
        this._noHoverQuery?.addEventListener?.('change', updateHoverCapability);
        destroyRef.onDestroy(() => {
            this._noHoverQuery?.removeEventListener?.('change', updateHoverCapability);
            this.unbind();
        });
        effect(() => this.rebind(this.for()));
    }

    // #endregion

    // #region Properties

    /**
     * Element reference, native element or component to monitor for pointer and focus events.
     * While the user hovers over or focuses within this target, the directive host becomes visible.
     *
     * @public
     * @readonly
     */
    public readonly for = input<HoverRevealTarget>(null, { alias: 'ngpHoverRevealFor' });

    // #endregion

    // #region Methods

    /**
     * Applies the initial visibility for the current pointer capabilities.
     *
     * @public
     */
    public ngOnInit(): void {
        this.updateVisibility();
    }

    /**
     * Binds pointer and focus listeners once the view has been initialised.
     *
     * @public
     */
    public ngAfterViewInit(): void {
        this.rebind(this.for());
    }

    private rebind(target: HoverRevealTarget): void {
        this.unbind();
        const element = this.resolveElement(target);
        if (element === null) {
            return;
        }

        this._cleanups = [
            this._renderer.listen(element, 'mouseenter', () => {
                this._isPointerWithin = true;
                this.updateVisibility();
            }),
            this._renderer.listen(element, 'mouseleave', () => {
                this._isPointerWithin = false;
                this.updateVisibility();
            }),
            this._renderer.listen(element, 'focusin', () => {
                this._hasFocusWithin = true;
                this.updateVisibility();
            }),
            this._renderer.listen(element, 'focusout', (event: FocusEvent) => {
                if (event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) {
                    return;
                }

                this._hasFocusWithin = false;
                this.updateVisibility();
            }),
        ];
    }

    private resolveElement(target: HoverRevealTarget): HTMLElement | null {
        if (target === null) {
            return null;
        }

        if (target instanceof HTMLElement) {
            return target;
        }

        if (target instanceof ElementRef) {
            return target.nativeElement;
        }

        return this.hasElementRef(target) ? target.elementRef.nativeElement : null;
    }

    private hasElementRef(target: unknown): target is IHasElementRef {
        return target !== null && typeof target === 'object' && 'elementRef' in target && target.elementRef instanceof ElementRef;
    }

    private updateVisibility(): void {
        const isVisible = (this._noHoverQuery?.matches ?? false) || this._isPointerWithin || this._hasFocusWithin;
        this._renderer.setStyle(this._host, 'opacity', isVisible ? '1' : '0');
        this._renderer.setStyle(this._host, 'pointer-events', isVisible ? 'auto' : 'none');
    }

    private unbind(): void {
        for (const cleanup of this._cleanups) {
            cleanup();
        }

        this._cleanups = [];
        this._isPointerWithin = false;
        this._hasFocusWithin = false;
        this.updateVisibility();
    }

    // #endregion
}
