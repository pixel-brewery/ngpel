import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { EVENT_HUB_RETAINED_KEYS } from './EVENT_HUB_RETAINED_KEYS';
import { EventHub } from './EventHub';

/**
 * Installs a hub in the current environment injector.
 *
 * @param retainedKeys - The finite set of event names for which `last` and `pop` keep a payload.
 * @returns Providers for an independent event hub in this injector.
 * @public
 */
export function provideEventHub<TEvents extends object = Record<string, unknown>>(
    ...retainedKeys: ReadonlyArray<Extract<keyof TEvents, string>>
): EnvironmentProviders {
    return makeEnvironmentProviders([EventHub, { provide: EVENT_HUB_RETAINED_KEYS, useValue: retainedKeys }]);
}
