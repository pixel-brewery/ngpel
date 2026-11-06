// #region Imports

import { DestroyRef, DOCUMENT, inject, type Signal, signal } from '@angular/core';

// #endregion

/**
 * Tracks a media query as a signal for the lifetime of the current injection context. Where there
 * is no window — server-side rendering, a unit test without a DOM — the query never matches
 * instead of throwing.
 *
 * @internal
 * @param query The media query string, for example `'(min-width: 960px)'`.
 * @returns Whether the query currently matches.
 */
export function mediaQuerySignal(query: string): Signal<boolean> {
    const destroyRef = inject(DestroyRef);
    const view = inject(DOCUMENT).defaultView;
    const mediaQueryList = typeof view?.matchMedia === 'function' ? view.matchMedia(query) : null;
    const matches = signal<boolean>(mediaQueryList?.matches ?? false);

    if (mediaQueryList !== null) {
        const listener = (event: MediaQueryListEvent): void => matches.set(event.matches);

        mediaQueryList.addEventListener('change', listener);
        destroyRef.onDestroy((): void => mediaQueryList.removeEventListener('change', listener));
    }

    return matches.asReadonly();
}
