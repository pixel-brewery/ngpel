// #region Imports

import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    contentChild,
    inject,
    signal,
    viewChild,
    type OnDestroy,
    type Signal,
    type WritableSignal,
} from '@angular/core';
import { MenuComponent, PopupComponent } from '@pixel-brewery/mosaik-elements-angular';
import { ActionStripContentDirective } from './ActionStripContentDirective';
import type { IActionStripShowRequest } from './IActionStripShowRequest';

// #endregion

const ACTION_STRIP_INSET = 4;
const ACTION_STRIP_HIDE_DELAY = 100;

/**
 * Hosts one item-anchored action strip whose actions are declared as projected HTML.
 *
 * One component instance is reused for every trigger. Its Mosaik popup is attached to the active
 * item and its template context is replaced whenever the hovered or focused item changes.
 *
 * @typeParam T - Context value resolved by a trigger.
 * @public
 */
@Component({
    selector: 'ngp-action-strip',
    host: { class: 'contents' },
    imports: [MenuComponent, NgTemplateOutlet, PopupComponent],
    template: `
        <mosaik-popup
            [trigger]="'manual'"
            [placement]="'bottom-end'"
            [placements]="['bottom-end']"
            [distance]="0"
            [skidding]="0"
            [interactive]="true"
            [flip]="false"
            [shift]="true"
            [trapFocus]="false"
            [closeOnScroll]="true"
            [hasBackdrop]="false"
            [pressEscapeToClose]="true"
            [clickOutsideToClose]="false"
            (closed)="onClosed()"
        >
            <div
                #surface
                slot="content"
                part="surface"
                tabindex="-1"
                (pointerenter)="onSurfaceEnter()"
                (pointerleave)="onSurfaceLeave($event)"
                (focusin)="onSurfaceEnter()"
                (focusout)="onSurfaceLeave($event)"
                (activated)="onActionInteraction($event)"
                (pointerdown)="onInteraction($event)"
                (keydown)="onInteraction($event)"
            >
                <mosaik-menu [attr.role]="'menu'" [attr.aria-orientation]="'horizontal'">
                    @if (content(); as actionContent) {
                        @if (activeRequest(); as request) {
                            <ng-container [ngTemplateOutlet]="actionContent.templateRef" [ngTemplateOutletContext]="{ $implicit: request.context }" />
                        }
                    }
                </mosaik-menu>
            </div>
        </mosaik-popup>
    `,
    styles: `
        mosaik-menu::part(root) {
            flex-direction: row;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionStripComponent<T = unknown> implements OnDestroy {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _popup: Signal<PopupComponent> = viewChild.required(PopupComponent);
    private readonly _popupHost = viewChild(PopupComponent, { read: ElementRef });
    private readonly _surface = viewChild<ElementRef<HTMLElement>>('surface');
    private readonly _activeRequest = signal<IActionStripShowRequest<T> | null>(null);
    private readonly _isOpen: WritableSignal<boolean> = signal(false);
    private _desiredRequest: IActionStripShowRequest<T> | null = null;
    private _origin: HTMLElement | null = null;
    private _hideTimer: number | undefined;
    private _actionHideQueued = false;
    private _isReconciling = false;
    private _reconcilePromise: Promise<void> | null = null;
    private _destroyed = false;

    // #endregion

    // #region Properties

    /** Active item exposed to the declarative content template. */
    protected readonly activeRequest = this._activeRequest.asReadonly();

    /** Caller-provided declarative action template. */
    protected readonly content: Signal<ActionStripContentDirective<T> | undefined> = contentChild<ActionStripContentDirective<T>>(ActionStripContentDirective);

    // #endregion

    // #region Methods

    /** Cancels deferred interaction work before Angular destroys the strip. */
    public ngOnDestroy(): void {
        this.cancelScheduledHide();
        this._destroyed = true;
        this._desiredRequest = null;
    }

    /**
     * Shows this strip at the top end of an item and exposes that item's value to the template.
     *
     * @param request - Active item context and its host element.
     * @public
     */
    public async show(request: IActionStripShowRequest<T>): Promise<void> {
        this.cancelScheduledHide();
        if (this._destroyed) {
            return;
        }

        this._desiredRequest = request;
        this._origin = request.origin;
        this._activeRequest.set(request);
        await this.reconcile();
    }

    /**
     * Schedules hiding after a short pointer bridge between an item and its floating strip.
     *
     * @param origin - Optional item expected to own the currently visible strip.
     * @public
     */
    public scheduleHide(origin?: HTMLElement): void {
        this.cancelScheduledHide();
        const view = this._document.defaultView;
        if (!view) {
            void this.hide(origin);
            return;
        }

        this._hideTimer = view.setTimeout(() => {
            this._hideTimer = undefined;
            void this.hide(origin);
        }, ACTION_STRIP_HIDE_DELAY);
    }

    /** Cancels a pending hide while pointer or focus is inside the floating action surface. */
    public cancelScheduledHide(): void {
        if (this._hideTimer === undefined) {
            return;
        }

        this._document.defaultView?.clearTimeout(this._hideTimer);
        this._hideTimer = undefined;
    }

    /**
     * Hides the strip and clears its active item context.
     *
     * @param origin - Optional item expected to own the currently visible strip.
     * @public
     */
    public async hide(origin?: HTMLElement): Promise<void> {
        if (origin && this._desiredRequest?.origin !== origin) {
            return;
        }

        this.cancelScheduledHide();
        this._desiredRequest = null;
        await this.reconcile();
    }

    /** Keeps the strip open while its surface contains pointer or keyboard focus. */
    protected onSurfaceEnter(): void {
        this.cancelScheduledHide();
    }

    /** Starts the hide bridge after pointer or keyboard focus leaves the action surface. */
    protected onSurfaceLeave(event: PointerEvent | FocusEvent): void {
        if (this.isWithinSurface(event.relatedTarget)) {
            return;
        }
        this.scheduleHide(this._origin ?? undefined);
    }

    /** Stops pointer and keyboard events from activating the item beneath the strip. */
    protected onInteraction(event: Event): void {
        event.stopPropagation();
    }

    /** Stops item activation and hides the strip after an action has handled its event. */
    protected onActionInteraction(event: Event): void {
        event.stopPropagation();
        if (this.isPopoverMenuItemActivation(event)) {
            return;
        }

        if (this._actionHideQueued) {
            return;
        }

        this._actionHideQueued = true;
        queueMicrotask(() => {
            this._actionHideQueued = false;
            void this.hide();
        });
    }

    /** Clears transient item context after Mosaik closes the popup. */
    protected onClosed(): void {
        this.cancelScheduledHide();
        this._isOpen.set(false);
        if (this._isReconciling) {
            return;
        }

        this._desiredRequest = null;
        this.clearContext();
    }

    private applyRequest(request: IActionStripShowRequest<T>): void {
        const bounds = request.origin.getBoundingClientRect();
        const popup = this._popup();
        popup.invoke('attach', request.origin);
        popup.setInput('distance', -bounds.height + ACTION_STRIP_INSET);
        popup.setInput('skidding', -ACTION_STRIP_INSET);
        const host: unknown = this._popupHost()?.nativeElement;
        if (host instanceof HTMLElement && 'shiftBoundary' in host && 'shiftPadding' in host) {
            Reflect.set(host, 'shiftBoundary', request.boundaries.length ? [...request.boundaries] : null);
            Reflect.set(host, 'shiftPadding', ACTION_STRIP_INSET);
        }
    }

    private clearContext(): void {
        this._isOpen.set(false);
        this._activeRequest.set(null);
        this._origin = null;
    }

    private reconcile(): Promise<void> {
        if (this._reconcilePromise) {
            return this._reconcilePromise;
        }

        const promise = this.runReconciliation();
        this._reconcilePromise = promise;
        void promise.then(
            () => this.clearReconcilePromise(promise),
            () => this.clearReconcilePromise(promise),
        );
        return promise;
    }

    private clearReconcilePromise(promise: Promise<void>): void {
        if (this._reconcilePromise === promise) {
            this._reconcilePromise = null;
        }
    }

    private async runReconciliation(): Promise<void> {
        this._isReconciling = true;
        try {
            while (!this._destroyed) {
                const request = this._desiredRequest;

                if (request) {
                    this.applyRequest(request);
                    if (!this._isOpen()) {
                        await this._popup().invoke('open');
                        this._isOpen.set(true);
                    }
                } else if (this._isOpen()) {
                    await this._popup().invoke('close');
                    this._isOpen.set(false);
                }

                if (request === this._desiredRequest) {
                    if (!request) {
                        this.clearContext();
                    }
                    return;
                }
            }
        } finally {
            this._isReconciling = false;
        }
    }

    private isWithinSurface(candidate: EventTarget | null): boolean {
        let current = candidate;

        while (current instanceof Node) {
            if (this._surface()?.nativeElement.contains(current) || this._elementRef.nativeElement.contains(current)) {
                return true;
            }

            const root = current.getRootNode();
            current = root instanceof ShadowRoot ? root.host : current.parentNode;
        }

        return false;
    }

    private isPopoverMenuItemActivation(event: Event): boolean {
        const menuItem = event
            .composedPath()
            .find((candidate): candidate is HTMLElement => candidate instanceof HTMLElement && candidate.localName === 'mosaik-menu-item');

        return menuItem?.getAttribute('menu-mode') === 'popover';
    }

    // #endregion
}
