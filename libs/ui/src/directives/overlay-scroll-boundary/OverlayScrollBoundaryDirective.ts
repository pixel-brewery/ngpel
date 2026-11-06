// #region Imports

import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';

// #endregion

/**
 * Keeps wheel and touch scrolling inside an overflow region before an overlay's
 * document-level scroll lock can cancel the event.
 *
 * @public
 */
@Directive({
    selector: '[ngpOverlayScrollBoundary]',
    standalone: true,
})
export class OverlayScrollBoundaryDirective {
    // #region Fields

    private readonly _host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    private readonly _window: Window | null = inject(DOCUMENT).defaultView;
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    // #endregion

    // #region Ctor

    public constructor() {
        const window = this._window;
        if (!window) {
            return;
        }

        const options: AddEventListenerOptions = { capture: true, passive: true };
        const retainScrollableEvent = (event: Event): void => this.retainScrollableEvent(event);

        window.addEventListener('wheel', retainScrollableEvent, options);
        window.addEventListener('touchmove', retainScrollableEvent, options);
        this._destroyRef.onDestroy(() => {
            window.removeEventListener('wheel', retainScrollableEvent, options);
            window.removeEventListener('touchmove', retainScrollableEvent, options);
        });
    }

    // #endregion

    // #region Methods

    private retainScrollableEvent(event: Event): void {
        if (this._host.scrollHeight <= this._host.clientHeight || !event.composedPath().includes(this._host)) {
            return;
        }

        event.stopPropagation();
    }

    // #endregion
}
