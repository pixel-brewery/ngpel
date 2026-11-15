// #region Imports

import { DestroyRef, Directive, effect, ElementRef, inject, input } from '@angular/core';
import type { IFocusTargetMarker } from './IFocusTargetMarker';

// #endregion

// #region Constants

const DEFAULT_MARKER_ATTRIBUTE = 'data-focus-target';
const DEFAULT_FOCUSABLE_SELECTOR =
    'input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), a[href], [tabindex], [contenteditable="true"]';

// #endregion

/**
 * Scrolls to and focuses a descendant of the host whenever a focus key is requested.
 *
 * Descendants are marked with an attribute (by default `data-focus-target`) whose value is the
 * key. Setting the key, or bumping the monotonic request marker while the key stays the same,
 * schedules the focus after two animation frames so freshly rendered content has been laid out.
 * The element that finally receives focus is the marked element itself when it is focusable,
 * otherwise its first focusable descendant; the marked element is scrolled into view either way.
 * When the host itself carries the marker it is the target, which is how a page can move focus
 * to a freshly rendered status heading. When the primary marker is absent, the directive uses
 * the first rendered fallback marker in the supplied order.
 *
 * @example
 * ```html
 * <form [ngpFocusTarget]="presenter.focusedField()" [ngpFocusTargetRequest]="presenter.focusRequest()">
 *     <label data-focus-target="email">E-mail <input type="email" /></label>
 *     <h2 data-focus-target="summary" tabindex="-1">Summary</h2>
 * </form>
 * ```
 *
 * @public
 */
@Directive({
    selector: '[ngpFocusTarget]',
    exportAs: 'ngpFocusTarget',
})
export class FocusTargetDirective {
    // #region Fields

    private readonly _host: HTMLElement;
    private _lastSignature: string | null = null;
    private _cancelPending: (() => void) | null = null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `FocusTargetDirective` class.
     *
     * @public
     * @param elementRef The host element whose descendants are focus targets.
     * @param destroyRef The destruction lifecycle used to cancel a pending focus.
     */
    public constructor(elementRef: ElementRef<HTMLElement> = inject(ElementRef), destroyRef: DestroyRef = inject(DestroyRef)) {
        this._host = elementRef.nativeElement;
        destroyRef.onDestroy(() => this.cancelPending());
        effect(() => this.handleRequest());
    }

    // #endregion

    // #region Properties

    /**
     * The key of the descendant to focus; `null` or an empty string clears the pending request.
     *
     * @public
     * @readonly
     */
    public readonly key = input<string | null>(null, { alias: 'ngpFocusTarget' });

    /**
     * Monotonic request marker used to focus the same key again.
     *
     * @public
     * @readonly
     */
    public readonly request = input<number>(0, { alias: 'ngpFocusTargetRequest' });

    /**
     * The attribute that marks focus targets (defaults to `data-focus-target`).
     *
     * @public
     * @readonly
     */
    public readonly attribute = input<string>(DEFAULT_MARKER_ATTRIBUTE, { alias: 'ngpFocusTargetAttribute' });

    /**
     * Ordered alternate markers considered when the primary marker is absent.
     *
     * @public
     * @readonly
     */
    public readonly fallbacks = input<ReadonlyArray<IFocusTargetMarker>>([], { alias: 'ngpFocusTargetFallbacks' });

    /**
     * The selector that identifies focusable descendants of a target.
     *
     * @public
     * @readonly
     */
    public readonly focusableSelector = input<string>(DEFAULT_FOCUSABLE_SELECTOR, { alias: 'ngpFocusTargetFocusable' });

    /**
     * The selector for focusing the marked element itself. Defaults to the descendant selector.
     *
     * @public
     * @readonly
     */
    public readonly selfFocusableSelector = input<string | null>(null, { alias: 'ngpFocusTargetSelfFocusable' });

    /**
     * The vertical alignment used to scroll the target into view; `null` skips scrolling.
     *
     * @public
     * @readonly
     */
    public readonly scrollBlock = input<ScrollLogicalPosition | null>('center', { alias: 'ngpFocusTargetScroll' });

    // #endregion

    // #region Methods

    private handleRequest(): void {
        const key = this.key();
        const request = this.request();
        if (!key) {
            this.cancelPending();
            this._lastSignature = null;
            return;
        }

        const signature = `${key}:${request}`;
        if (signature === this._lastSignature) {
            return;
        }

        this._lastSignature = signature;
        this.schedule(() => this.focusKey(key));
    }

    private schedule(action: () => void): void {
        this.cancelPending();
        const view = this._host.ownerDocument.defaultView;
        if (!view) {
            const timeoutId = setTimeout(() => {
                this._cancelPending = null;
                action();
            });
            this._cancelPending = () => clearTimeout(timeoutId);
            return;
        }

        let frameId = view.requestAnimationFrame(() => {
            frameId = view.requestAnimationFrame(() => {
                this._cancelPending = null;
                action();
            });
        });
        this._cancelPending = () => view.cancelAnimationFrame(frameId);
    }

    private cancelPending(): void {
        this._cancelPending?.();
        this._cancelPending = null;
    }

    private focusKey(key: string): void {
        const target = this.findMarkedTarget(this.attribute(), key) ?? this.findFallbackTarget();
        if (!target) {
            return;
        }

        const block = this.scrollBlock();
        if (block !== null) {
            target.scrollIntoView?.({ behavior: 'smooth', block });
        }

        const focusable = this.focusableSelector();
        const selfFocusable = this.selfFocusableSelector() ?? focusable;
        const focusTarget = target.matches(selfFocusable) ? target : target.querySelector<HTMLElement>(focusable);
        focusTarget?.focus({ preventScroll: true });
    }

    private findFallbackTarget(): HTMLElement | null {
        for (const marker of this.fallbacks()) {
            const target = this.findMarkedTarget(marker.attribute, marker.key);
            if (target) {
                return target;
            }
        }

        return null;
    }

    private findMarkedTarget(attribute: string, key: string): HTMLElement | null {
        if (this._host.getAttribute(attribute) === key) {
            return this._host;
        }

        for (const target of this._host.querySelectorAll<HTMLElement>(`[${attribute}]`)) {
            if (target.getAttribute(attribute) === key) {
                return target;
            }
        }

        return null;
    }

    // #endregion
}
