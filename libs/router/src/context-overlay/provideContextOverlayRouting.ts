import { type EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { CONTEXT_OVERLAY_OPTIONS } from './CONTEXT_OVERLAY_OPTIONS';
import { ContextOverlayService } from './ContextOverlayService';
import { ContextOverlayUrl } from './ContextOverlayUrl';
import type { IContextOverlayRoutingOptions } from './IContextOverlayRoutingOptions';

/**
 * Registers contextual URL synchronization at the application composition root.
 *
 * @public
 * @param options Path scope and invalid-URL handling, or an injection-context factory for them.
 * @returns Environment providers for the URL codec and active overlay coordinator.
 */
export function provideContextOverlayRouting(options: IContextOverlayRoutingOptions | (() => IContextOverlayRoutingOptions)): EnvironmentProviders {
    return makeEnvironmentProviders([
        typeof options === 'function' ? { provide: CONTEXT_OVERLAY_OPTIONS, useFactory: options } : { provide: CONTEXT_OVERLAY_OPTIONS, useValue: options },
        { provide: ContextOverlayUrl, useFactory: (): ContextOverlayUrl => new ContextOverlayUrl(inject(CONTEXT_OVERLAY_OPTIONS).supportsPath) },
        ContextOverlayService,
        provideEnvironmentInitializer((): void => {
            inject(ContextOverlayService);
        }),
    ]);
}
