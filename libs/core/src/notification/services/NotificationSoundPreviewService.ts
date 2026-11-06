// #region Imports

import { inject, Injectable } from '@angular/core';
import { AudioPlayer } from '@pixel-brewery/ngpel-core/audio';
import type { NotificationType } from '../models/NotificationType';
import type { INotificationSoundPreviewConfig } from './INotificationSoundPreviewConfig';

// #endregion

/**
 * Plays a notification sound on demand without raising a notification, so a settings screen can let
 * a user hear what they are about to switch on. It ignores the sound preferences by design — a
 * preview of a silenced severity has to be audible.
 *
 * Registered and configured by `withAudioNotificationInterceptor()`.
 *
 * @public
 */
@Injectable()
export class NotificationSoundPreviewService {
    // #region Fields

    private readonly _audioPlayer: AudioPlayer;
    private _config: INotificationSoundPreviewConfig | null = null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `NotificationSoundPreviewService` class.
     *
     * @public
     * @param audioPlayer The player the previews are played through.
     */
    public constructor(audioPlayer: AudioPlayer = inject(AudioPlayer)) {
        this._audioPlayer = audioPlayer;
    }

    // #endregion

    // #region Methods

    /**
     * Applies the sound table previews are played from, replacing any earlier one.
     *
     * @public
     * @param config The sound table.
     */
    public configure(config: INotificationSoundPreviewConfig): void {
        this._config = config;
    }

    /**
     * Plays the sound configured for a severity. Does nothing when the service is unconfigured or
     * the severity has no sound.
     *
     * @public
     * @param type The severity to preview.
     * @returns A promise that resolves once the player reports playback.
     * @throws The browser playback failure when the sound cannot start.
     */
    public async play(type: NotificationType): Promise<void> {
        const config = this._config;
        const src = config?.sounds[type] ?? config?.defaultSound;

        if (!src) {
            return;
        }

        await this._audioPlayer.play({ src }, config?.options ?? null);
    }

    // #endregion
}
