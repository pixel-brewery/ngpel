import type { Provider } from '@angular/core';
import type { IResourceNavigationTarget } from './IResourceNavigationTarget';
import { RESOURCE_NAVIGATION_TARGETS } from './RESOURCE_NAVIGATION_TARGETS';

/**
 * Contributes a feature resource link at application composition.
 *
 * @public
 * @param target A target or a factory that can inject feature collaborators.
 * @returns A multi-provider for the application injector.
 */
export function provideResourceNavigationTarget(target: IResourceNavigationTarget | (() => IResourceNavigationTarget)): Provider {
    return typeof target === 'function'
        ? { provide: RESOURCE_NAVIGATION_TARGETS, useFactory: target, multi: true }
        : { provide: RESOURCE_NAVIGATION_TARGETS, useValue: target, multi: true };
}
