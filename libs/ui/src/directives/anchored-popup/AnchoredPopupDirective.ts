import type { IAnchoredPopupEvent } from './IAnchoredPopupEvent';
import { DestroyRef, Directive, inject, input, signal } from '@angular/core';
import { PopupComponent } from '@pixel-brewery/mosaik-elements-angular';

/** An event that can anchor a manually controlled popup to a DOM element. */
/** Coordinates one popup across changing anchors and asynchronous content. */
@Directive({
    selector: 'mosaik-popup[ngpAnchoredPopup]',
    exportAs: 'ngpAnchoredPopup',
})
export class AnchoredPopupDirective<TEvent extends IAnchoredPopupEvent, TResult> {
    public readonly load = input.required<(event: TEvent) => Promise<TResult | null>>({ alias: 'ngpAnchoredPopup' });
    public readonly current = signal<TEvent | null>(null);
    public readonly result = signal<TResult | null>(null);
    public readonly loading = signal(false);
    public readonly failed = signal(false);

    private readonly _popup = inject(PopupComponent);
    private readonly _destroyRef = inject(DestroyRef);
    private _anchor: HTMLElement | null = null;
    private _transition: Promise<void> = Promise.resolve();
    private _requestId = 0;
    private _destroyed = false;

    public constructor() {
        this._destroyRef.onDestroy(() => {
            this._destroyed = true;
            this._anchor = null;
            this._requestId += 1;
        });
    }

    public show(event: TEvent): void {
        const { anchor } = event;
        if (this._destroyed || this._anchor === anchor) return;
        this._anchor = anchor;
        this.current.set(event);
        this.result.set(null);
        this.loading.set(true);
        this.failed.set(false);
        const requestId = ++this._requestId;
        void Promise.resolve()
            .then(() => this.load()(event))
            .then((result) => {
                if (this._destroyed || requestId !== this._requestId || this._anchor !== anchor) return;
                this.loading.set(false);
                this.result.set(result);
                this.failed.set(result === null);
            })
            .catch(() => {
                if (this._destroyed || requestId !== this._requestId || this._anchor !== anchor) return;
                this.loading.set(false);
                this.failed.set(true);
            });
        this._transition = this._transition.then(async () => {
            if (this._destroyed || !this._anchor?.isConnected) return;
            this._popup.invoke('attach', this._anchor);
            await this._popup.invoke('open');
        });
    }

    public hide(anchor: HTMLElement, force = false): void {
        if (this._destroyed || this._anchor !== anchor) return;
        if (!force && (anchor === anchor.ownerDocument.activeElement || anchor.matches(':hover'))) return;
        this._anchor = null;
        this._requestId += 1;
        this._transition = this._transition.then(async () => {
            if (this._destroyed || this._anchor) return;
            const active = anchor.ownerDocument.activeElement;
            await this._popup.invoke('close');
            if (anchor.ownerDocument.activeElement !== active) {
                if (active instanceof HTMLElement && active.isConnected && active !== anchor.ownerDocument.body) {
                    active.focus({ preventScroll: true });
                } else if (anchor.ownerDocument.activeElement instanceof HTMLElement) {
                    anchor.ownerDocument.activeElement.blur();
                }
            }
            // Keep current/result mounted during the popup's exit and immediate reopen.
        });
    }
}
