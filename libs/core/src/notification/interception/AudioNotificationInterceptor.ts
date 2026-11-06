// #region Imports

import { inject, Injectable } from '@angular/core';
import { AudioPlayer } from '@pixel-brewery/ngpel-core/audio';
import type { INotification } from '../models/INotification';
import type { IAudioNotificationInterceptorConfig } from './IAudioNotificationInterceptorConfig';
import { NotificationInterceptor } from './NotificationInterceptor';

// #endregion

/**
 * Plays a sound for a raised notification through the {@link AudioPlayer}. Playback is started but
 * never awaited, so a browser that refuses to play unprompted audio slows nothing down: the
 * rejection is reported on the configured diagnostic channel and the notification keeps travelling
 * through the remaining interceptors.
 *
 * An unconfigured interceptor stays silent, as does one whose gate rejects the notification or
 * whose sound table names no source for its severity.
 *
 * @public
 */
@Injectable()
export class AudioNotificationInterceptor extends NotificationInterceptor<IAudioNotificationInterceptorConfig> {
    // #region Fields

    private readonly _audioPlayer: AudioPlayer;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `AudioNotificationInterceptor` class.
     *
     * @public
     * @param audioPlayer The player the sounds are played through.
     */
    public constructor(audioPlayer: AudioPlayer = inject(AudioPlayer)) {
        super();

        this._audioPlayer = audioPlayer;
    }

    // #endregion

    // #region Methods

    /**
     * Plays the sound configured for the severity of the notification.
     *
     * @public
     * @override
     * @param notification The raised notification.
     */
    public push(notification: INotification): void {
        const config = this.config;

        if (!config || config.isDisabled || config.isEnabled?.(notification) === false) {
            return;
        }

        const src = config.sounds[notification.type] ?? config.defaultSound;

        if (!src) {
            return;
        }

        void this._audioPlayer.play({ src }, config.options ?? null).catch((error: unknown): void => {
            (config.logger ?? console).error('Notification sound playback failed.', error);
        });
    }

    // #endregion
}
