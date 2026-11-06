import type { Provider } from '@angular/core';
import { CONTEXT_OVERLAY_TARGETS } from './CONTEXT_OVERLAY_TARGETS';
import type { IContextOverlayTarget } from './IContextOverlayTarget';

/**
 * Registers a feature target without coupling the application's shell to its lazy surface.
 *
 * @public
 * @typeParam TResult The result returned by the target's surface.
 * @param factory Factory that can inject feature services at application composition.
 * @returns A multi-provider to register at application composition.
 */
export function provideContextOverlayTarget<TResult>(factory: () => IContextOverlayTarget<TResult>): Provider {
    return { provide: CONTEXT_OVERLAY_TARGETS, useFactory: factory, multi: true };
}
