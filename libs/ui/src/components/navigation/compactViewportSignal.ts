import { DOCUMENT, DestroyRef, inject, signal, type Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointService } from '@pixel-brewery/mosaik-elements-angular';

/** Uses the application's Mosaik breakpoint, or the shell breakpoint when no registry is provided. */
export function compactViewportSignal(): Signal<boolean> {
    const breakpoints = inject(BreakpointService, { optional: true });
    if (breakpoints) {
        return toSignal(breakpoints.observe('lt-md'), { initialValue: breakpoints.isMatched('lt-md') });
    }

    const view = inject(DOCUMENT).defaultView;
    const query = view?.matchMedia?.('(max-width: 959.98px)');
    const matches = signal(query?.matches ?? false);
    if (query) {
        const listener = (event: MediaQueryListEvent): void => matches.set(event.matches);
        query.addEventListener('change', listener);
        inject(DestroyRef).onDestroy(() => query.removeEventListener('change', listener));
    }
    return matches.asReadonly();
}
