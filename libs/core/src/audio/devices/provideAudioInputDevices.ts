// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import { AudioInputDevicePreferenceService } from './AudioInputDevicePreferenceService';
import type { AudioInputDeviceFeatureKind } from './AudioInputDeviceFeatureKind';
import { AudioInputDeviceService } from './AudioInputDeviceService';

// #endregion

/**
 * Registers the microphone discovery and voice-test services together with the persisted
 * selection. Persistence goes through the user-preference port of
 * `@pixel-brewery/ngpel-core/storage`, so an application that stores a microphone also composes
 * `provideUserPreferences(...)`; without it, injecting the preference service fails loudly
 * instead of dropping writes.
 *
 * @public
 * @param features Device features such as `withAudioInputDevicePreferenceKey(...)`.
 * @returns Environment providers for the application or route composition root.
 * @throws Error when two preference-key features are given.
 *
 * @example
 * ```typescript
 * export const appConfig = {
 *     providers: [provideUserPreferences(withLocalStorage()), provideAudioInputDevices()]
 * };
 * ```
 */
export function provideAudioInputDevices(...features: ReadonlyArray<IFeature<AudioInputDeviceFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([AudioInputDeviceService, AudioInputDevicePreferenceService], features));
}
