// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TextToSpeechService } from './TextToSpeechService';

// #endregion

/**
 * Registers the {@link TextToSpeechService} for the composition root it is added to. Speech is
 * bound to that injector's lifetime, so leaving a route that reads text aloud silences it.
 *
 * @public
 * @returns Environment providers for the application or route composition root.
 *
 * @example
 * ```typescript
 * export const appConfig = {
 *     providers: [provideTextToSpeech()]
 * };
 * ```
 */
export function provideTextToSpeech(): EnvironmentProviders {
    return makeEnvironmentProviders([TextToSpeechService]);
}
