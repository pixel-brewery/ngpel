// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    ErrorHandler,
    contentChild,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { PopupComponent } from '@pixel-brewery/mosaik-elements-angular';
import { ContextMenuContentDirective } from './ContextMenuContentDirective';
import type { IContextMenuOpenRequest } from './IContextMenuOpenRequest';

// #endregion

/**
 * Displays caller-provided Mosaik menu actions for the item that opened it. Place one host
 * beside a list or table and connect it using `ngpContextMenuTriggerFor`.
 *
 * @typeParam T The item passed to the projected template.
 * @public
 */
@Component({
    selector: 'ngp-context-menu',
    imports: [NgTemplateOutlet, PopupComponent],
    styles: ':host { display: contents; }',
    template: `
        <mosaik-popup
            trigger="manual"
            placement="bottom-start"
            [placements]="['bottom-start', 'bottom-end', 'top-start', 'top-end']"
            [interactive]="true"
            [flip]="true"
            [shift]="true"
            [trapFocus]="false"
            [closeOnScroll]="true"
            [hasBackdrop]="false"
            [pressEscapeToClose]="true"
            [clickOutsideToClose]="false"
            (opened)="onOpened()"
            (closed)="onClosed()"
        >
            <div #actions slot="content">
                @if (content(); as menuContent) {
                    @if (activeRequest(); as request) {
                        <ng-container [ngTemplateOutlet]="menuContent.templateRef" [ngTemplateOutletContext]="{ $implicit: request.context }" />
                    }
                }
            </div>
        </mosaik-popup>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent<T = unknown> {
    // #region Fields

    private readonly _changeDetector = inject(ChangeDetectorRef);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _errorHandler = inject(ErrorHandler);
    private readonly _popup = viewChild(PopupComponent);
    private readonly _actions = viewChild<ElementRef<HTMLElement>>('actions');
    private readonly _activeRequest = signal<IContextMenuOpenRequest<T> | null>(null);
    private _transition = Promise.resolve();
    private _revision = 0;
    private _activeRevision = 0;
    private _repositioning = false;
    private _outsideListener?: AbortController;

    // #endregion

    // #region Ctor

    /** Releases the document listener when the host is destroyed. */
    public constructor() {
        this._destroyRef.onDestroy(() => this._outsideListener?.abort());
    }

    // #endregion

    // #region Properties

    /** Whether a request is active, including while the popup opens. */
    public readonly isOpen = computed(() => this._activeRequest() !== null);

    /** The current item and its anchor, when the popup is open or opening. */
    protected readonly activeRequest = this._activeRequest.asReadonly();

    /** Menu content contributed by the caller. */
    protected readonly content = contentChild<ContextMenuContentDirective<T>>(ContextMenuContentDirective);

    // #endregion

    // #region Methods

    /**
     * Opens at the supplied viewport position. A newer request wins over queued openings.
     *
     * @param request Position, context and element used as the anchor.
     */
    public open(request: IContextMenuOpenRequest<T>): Promise<void> {
        const revision = ++this._revision;

        return this.enqueue(async () => {
            const popup = this._popup();
            if (!popup || !this.isCurrent(revision) || !request.origin.isConnected) {
                return;
            }

            if (this._activeRequest()) {
                this._repositioning = true;
                try {
                    await popup.invoke('close');
                } finally {
                    this._repositioning = false;
                }
            }
            if (!this.isCurrent(revision) || !request.origin.isConnected) {
                return;
            }

            const bounds = request.origin.getBoundingClientRect();
            popup.invoke('attach', request.origin);
            popup.setInput('distance', request.clientY - bounds.bottom);
            popup.setInput('skidding', request.clientX - bounds.left);
            this._activeRevision = revision;
            this._activeRequest.set(request);
            try {
                this.listenWhileOpen(request.origin);
                this._changeDetector.detectChanges();
                await popup.invoke('open');
            } catch (error) {
                this._outsideListener?.abort();
                this._activeRequest.set(null);
                throw error;
            }
        });
    }

    /** Cancels queued openings and closes the active menu. */
    public close(): Promise<void> {
        ++this._revision;

        return this.enqueue(async () => {
            const popup = this._popup();
            if (popup && !this._destroyRef.destroyed && this._activeRequest()) {
                await popup.invoke('close');
            }
        });
    }

    protected onOpened(): void {
        if (!this.isCurrent(this._activeRevision)) {
            return;
        }

        this.focusFirstAction(this._activeRevision, 8);
    }

    protected onClosed(): void {
        const previous = this._activeRequest();
        const actions = this._actions()?.nativeElement;
        const focusWasInMenu = actions?.contains(actions.ownerDocument.activeElement);
        this._outsideListener?.abort();
        this._activeRequest.set(null);

        if (!this._repositioning && focusWasInMenu && previous?.origin.isConnected) {
            previous.origin.focus({ preventScroll: true });
        }
    }

    protected onItemActivated(event: Event): void {
        const item = event
            .composedPath()
            .find(
                (node): node is HTMLElement & { disabled?: boolean; menuMode?: string } => node instanceof HTMLElement && node.localName === 'mosaik-menu-item',
            );
        if (!item || item.disabled || (item.menuMode ?? item.getAttribute('menu-mode')) === 'popover') {
            return;
        }

        const revision = this._revision;
        queueMicrotask(() => {
            if (this.isCurrent(revision)) {
                void this.close().catch((error: unknown) => this._errorHandler.handleError(error));
            }
        });
    }

    private enqueue(action: () => Promise<void>): Promise<void> {
        const next = this._transition.then(action);
        this._transition = next.catch(() => undefined);
        return next;
    }

    private listenWhileOpen(origin: HTMLElement): void {
        this._outsideListener?.abort();
        const listener = new AbortController();
        this._outsideListener = listener;
        origin.ownerDocument.addEventListener(
            'click',
            (event) => {
                const path = event.composedPath();
                if (!path.includes(origin) && !this.isMenuEvent(path)) {
                    void this.close().catch((error: unknown) => this._errorHandler.handleError(error));
                }
            },
            { signal: listener.signal },
        );
        origin.ownerDocument.addEventListener(
            'activated',
            (event) => {
                if (this.isMenuEvent(event.composedPath())) {
                    this.onItemActivated(event);
                }
            },
            { capture: true, signal: listener.signal },
        );
    }

    private isMenuEvent(path: ReadonlyArray<EventTarget>): boolean {
        const actions = this._actions()?.nativeElement;
        if (!actions) {
            return false;
        }
        if (path.includes(actions)) {
            return true;
        }

        // Mosaik submenus can be projected separately. Follow each floating surface back to its anchor.
        const visited = new Set<HTMLElement>();
        for (const target of path) {
            if (!(target instanceof HTMLElement)) {
                continue;
            }
            let element: HTMLElement | null = target;
            while (element && !visited.has(element)) {
                if (actions.contains(element)) {
                    return true;
                }
                visited.add(element);
                const anchor: unknown = element.localName === 'mosaik-floating' ? Reflect.get(element, 'anchor') : undefined;
                const root = element.getRootNode();
                element =
                    anchor instanceof HTMLElement
                        ? anchor
                        : (element.parentElement ?? (root instanceof ShadowRoot && root.host instanceof HTMLElement ? root.host : null));
            }
        }
        return false;
    }

    private focusFirstAction(revision: number, framesLeft: number): void {
        const actions = this._actions()?.nativeElement;
        const view = actions?.ownerDocument.defaultView;
        if (!actions || !view || !this._activeRequest() || !this.isCurrent(revision)) {
            return;
        }

        const firstItem = [...actions.querySelectorAll<HTMLElement>('mosaik-menu-item')].find(
            (item) => !item.closest('[slot="submenu"]') && !(item as HTMLElement & { disabled?: boolean }).disabled,
        );
        if (!firstItem) {
            return;
        }

        firstItem.focus({ preventScroll: true });
        // The popup can emit "opened" before Mosaik has projected the items into its visible portal.
        if (actions.ownerDocument.activeElement !== firstItem && framesLeft > 0) {
            view.requestAnimationFrame(() => this.focusFirstAction(revision, framesLeft - 1));
        }
    }

    private isCurrent(revision: number): boolean {
        return !this._destroyRef.destroyed && this._revision === revision;
    }

    // #endregion
}
