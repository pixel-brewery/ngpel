// #region Imports

import { inject } from '@angular/core';
import { AudioPlayer } from './AudioPlayer';
import type { IAudioPlayOptions } from './IAudioPlayOptions';
import type { IAudioSource } from './IAudioSource';

// #endregion

/**
 * Plays one sound through the {@link AudioPlayer} of the current injector. Intended for the short
 * notification sounds that would otherwise make every caller inject the player itself; it must run
 * inside an injection context, so a component reaches it from a field initializer or through
 * `runInInjectionContext`.
 *
 * @public
 * @param src URL, retained blob, or externally owned live media stream.
 * @param options Volume, loop, and seek settings for this call.
 * @returns A promise that resolves once the element reports playback.
 * @throws The browser playback failure when the sound cannot start.
 *
 * @example
 * ```typescript
 * await play({ src: '/assets/sounds/notification.mp3' }, { volume: 0.4 });
 * ```
 */
export function play(src: IAudioSource, options?: IAudioPlayOptions | null): Promise<void> {
    return inject(AudioPlayer).play(src, options ?? null);
}
