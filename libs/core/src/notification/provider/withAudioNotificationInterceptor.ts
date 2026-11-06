// #region Imports

import { DestroyRef } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { AudioPlayer } from '@pixel-brewery/ngpel-core/audio';
import { AudioNotificationInterceptor } from '../interception/AudioNotificationInterceptor';
import type { IAudioNotificationInterceptorConfig } from '../interception/IAudioNotificationInterceptorConfig';
import { NotificationSoundPreviewService } from '../services/NotificationSoundPreviewService';
import { NotificationSoundSettingsService } from '../services/NotificationSoundSettingsService';
import { NOTIFICATION_INTERCEPTORS } from './NOTIFICATION_INTERCEPTORS';
import type { NotificationFeatureKind } from './NotificationFeatureKind';
import { NotificationKinds } from './NotificationKinds';

// #endregion

/**
 * Adds the {@link AudioNotificationInterceptor} to `provideNotification()`, so every raised
 * notification also plays the sound its severity is mapped to.
 *
 * The feature is self-sufficient: it brings the {@link AudioPlayer} it plays through, the
 * {@link NotificationSoundSettingsService} that holds the user's preferences and the
 * {@link NotificationSoundPreviewService} a settings screen previews the same sounds through.
 * Unless the caller states its own gate, the sound of a severity the user silenced is skipped.
 * Both the interceptor and the preview service are configured while they are constructed, so a
 * settings screen can preview before the first notification was ever raised, and the interceptor is
 * disposed with the injector it was composed into.
 *
 * @public
 * @param options The sound table plus optional gate, volume and diagnostic channel.
 * @returns The feature to pass to `provideNotification()`.
 *
 * @example
 * ```typescript
 * provideNotification(
 *     withAudioNotificationInterceptor({
 *         defaultSound: '/audio/notify.mp3',
 *         sounds: { error: '/audio/alert.mp3' },
 *         options: { volume: 0.4 }
 *     })
 * );
 * ```
 */
export function withAudioNotificationInterceptor(options: IAudioNotificationInterceptorConfig): IFeature<NotificationFeatureKind> {
    return createFeature('notification-audio-interceptor', NotificationKinds.AudioInterceptor, [
        AudioPlayer,
        NotificationSoundSettingsService,
        {
            provide: NotificationSoundPreviewService,
            deps: [AudioPlayer],
            useFactory: (audioPlayer: AudioPlayer): NotificationSoundPreviewService => {
                const soundPreview = new NotificationSoundPreviewService(audioPlayer);

                soundPreview.configure(options);

                return soundPreview;
            },
        },
        {
            provide: AudioNotificationInterceptor,
            deps: [AudioPlayer, NotificationSoundSettingsService, DestroyRef],
            useFactory: (audioPlayer: AudioPlayer, soundSettings: NotificationSoundSettingsService, destroyRef: DestroyRef): AudioNotificationInterceptor => {
                const interceptor = new AudioNotificationInterceptor(audioPlayer);

                interceptor.configure({
                    ...options,
                    isEnabled: options.isEnabled ?? ((notification) => soundSettings.isEnabled(notification.type)),
                });
                destroyRef.onDestroy(() => interceptor.dispose());

                return interceptor;
            },
        },
        { provide: NOTIFICATION_INTERCEPTORS, useExisting: AudioNotificationInterceptor, multi: true },
    ]);
}
