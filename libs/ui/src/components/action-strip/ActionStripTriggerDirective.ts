// #region Imports

import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, input, type InputSignal } from '@angular/core';
import { ActionStripComponent } from './ActionStripComponent';

// #endregion

const ACTION_STRIP_CONTEXT_FROM_EVENT = Symbol('ACTION_STRIP_CONTEXT_FROM_EVENT');

/**
 * Shows a declarative action strip while an item is hovered or contains keyboard focus.
 *
 * Direct item hosts supply `ngpActionStripValue`. A Mosaik data table may omit it: the directive
 * resolves the body-row value from the composed event path across the component's shadow roots.
 *
 * @typeParam T - Context value exposed to the action template.
 * @public
 */
@Directive({
    selector: '[ngpActionStripTriggerFor]',
    host: {
        '(pointerover)': 'onPointerOver($event)',
        '(pointermove)': 'onPointerMove($event)',
        '(pointerout)': 'onPointerOut($event)',
        '(focusin)': 'onFocusIn($event)',
        '(focusout)': 'onFocusOut($event)',
    },
})
export class ActionStripTriggerDirective<T = unknown> {
    // #region Fields

    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _document: Document = inject(DOCUMENT);
    private _activeOrigin: HTMLElement | null = null;

    // #endregion

    // #region Properties

    /** Action strip shown by this host. */
    public readonly strip: InputSignal<ActionStripComponent<T>> = input.required<ActionStripComponent<T>>({
        alias: 'ngpActionStripTriggerFor',
    });

    /** Optional item value. When omitted on a Mosaik data table, the body-row value is inferred. */
    public readonly value: InputSignal<T | typeof ACTION_STRIP_CONTEXT_FROM_EVENT> = input<T | typeof ACTION_STRIP_CONTEXT_FROM_EVENT>(
        ACTION_STRIP_CONTEXT_FROM_EVENT,
        { alias: 'ngpActionStripValue' },
    );

    /** Whether hover and focus invocation is disabled for this host. */
    public readonly disabled: InputSignal<boolean> = input(false, { alias: 'ngpActionStripDisabled' });

    // #endregion

    // #region Methods

    /** Shows the strip for the item under the pointer. */
    public onPointerOver(event: PointerEvent): void {
        this.showForEvent(event, true);
    }

    /** Tracks item changes inside Shadow-DOM collections whose boundary events are retargeted. */
    public onPointerMove(event: PointerEvent): void {
        this.showForEvent(event, false);
    }

    /** Hides the strip after the pointer leaves the complete active item, including the strip. */
    public onPointerOut(event: PointerEvent): void {
        this.hideForEvent(event);
    }

    /** Shows the strip for the item containing keyboard focus. */
    public onFocusIn(event: FocusEvent): void {
        this.showForEvent(event);
    }

    /** Hides the strip after keyboard focus leaves the complete active item. */
    public onFocusOut(event: FocusEvent): void {
        this.hideForEvent(event);
    }

    private showForEvent(event: PointerEvent | FocusEvent, force = true): void {
        if (this.disabled()) {
            return;
        }

        const resolved = this.resolveContext(event);
        if (!resolved || this.isWithinOrigin(resolved.origin, event.relatedTarget)) {
            return;
        }

        const boundaries = this.resolveClippingBoundaries(resolved.origin);
        if (!this.isEventWithinVisibleBounds(event, resolved.origin, boundaries)) {
            this._activeOrigin = null;
            void this.strip().hide(resolved.origin);
            return;
        }
        if (!force && this._activeOrigin === resolved.origin) {
            this.strip().cancelScheduledHide();
            return;
        }

        this._activeOrigin = resolved.origin;
        void this.strip().show({ ...resolved, boundaries });
    }

    private hideForEvent(event: PointerEvent | FocusEvent): void {
        if (this.disabled()) {
            return;
        }

        const resolved = this.resolveContext(event);
        if (!resolved || this.isWithinOrigin(resolved.origin, event.relatedTarget)) {
            return;
        }

        this._activeOrigin = null;
        this.strip().scheduleHide(resolved.origin);
    }

    private resolveContext(event: Event): Readonly<{ context: T; origin: HTMLElement }> | null {
        const configuredValue = this.value();

        if (configuredValue !== ACTION_STRIP_CONTEXT_FROM_EVENT) {
            return { context: configuredValue, origin: this._elementRef.nativeElement };
        }

        for (const candidate of event.composedPath()) {
            if (!(candidate instanceof HTMLElement) || candidate.localName !== 'mosaik-table-body-row') {
                continue;
            }

            const rowValue = (candidate as HTMLElement & { readonly value?: T }).value;
            if (rowValue !== undefined) {
                return { context: rowValue, origin: candidate };
            }
        }

        return null;
    }

    private isWithinOrigin(origin: HTMLElement, candidate: EventTarget | null): boolean {
        let current = candidate;

        while (current instanceof Node) {
            if (current === origin) {
                return true;
            }

            const root = current.getRootNode();
            current = root instanceof ShadowRoot ? root.host : current.parentNode;
        }

        return false;
    }

    private getComposedParent(element: Element): Element | null {
        if (element.assignedSlot) {
            return element.assignedSlot;
        }
        if (element.parentElement) {
            return element.parentElement;
        }

        const root = element.getRootNode();
        return root instanceof ShadowRoot ? root.host : null;
    }

    private isClippingBoundary(element: Element): boolean {
        const style = this._document.defaultView?.getComputedStyle(element);
        if (!style) {
            return false;
        }
        return [style.overflow, style.overflowX, style.overflowY].some(
            (overflow) => overflow === 'auto' || overflow === 'clip' || overflow === 'hidden' || overflow === 'scroll',
        );
    }

    private isEventWithinVisibleBounds(event: PointerEvent | FocusEvent, origin: HTMLElement, boundaries: ReadonlyArray<Element>): boolean {
        const view = this._document.defaultView;
        if (!view) {
            return false;
        }

        const originBounds = origin.getBoundingClientRect();
        let left = Math.max(0, originBounds.left);
        let top = Math.max(0, originBounds.top);
        let right = Math.min(view.innerWidth, originBounds.right);
        let bottom = Math.min(view.innerHeight, originBounds.bottom);

        for (const boundary of boundaries) {
            const bounds = boundary.getBoundingClientRect();
            left = Math.max(left, bounds.left);
            top = Math.max(top, bounds.top);
            right = Math.min(right, bounds.right);
            bottom = Math.min(bottom, bounds.bottom);
        }

        if (right <= left || bottom <= top) {
            return false;
        }
        if (!event.type.startsWith('pointer')) {
            return true;
        }

        const pointerEvent = event as PointerEvent;
        return pointerEvent.clientX >= left && pointerEvent.clientX <= right && pointerEvent.clientY >= top && pointerEvent.clientY <= bottom;
    }

    private resolveClippingBoundaries(origin: HTMLElement): ReadonlyArray<Element> {
        const boundaries: Array<Element> = [];
        let current = this.getComposedParent(origin);

        while (current) {
            if (this.isClippingBoundary(current) && current.getBoundingClientRect().width > 0) {
                boundaries.push(current);
            }
            current = this.getComposedParent(current);
        }

        return boundaries;
    }

    // #endregion
}
