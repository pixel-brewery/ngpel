// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AudioPlayer } from './AudioPlayer';

// #endregion

/**
 * Registers the {@link AudioPlayer} for the composition root it is added to. The player is bound
 * to that injector's lifetime, so a route-level composition releases its element when the route is
 * left instead of keeping one element alive for the whole application.
 *
 * @public
 * @returns Environment providers for the application or route composition root.
 *
 * @example
 * ```typescript
 * export const appConfig = {
 *     providers: [provideAudioPlayer()]
 * };
 * ```
 */
export function provideAudioPlayer(): EnvironmentProviders {
    return makeEnvironmentProviders([AudioPlayer]);
}
