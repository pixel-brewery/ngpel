// #region Imports

import type { IAudioPlayOptions } from '@pixel-brewery/ngpel-core/audio';
import type { NotificationType } from '../models/NotificationType';

// #endregion

/**
 * Sound table of the {@link NotificationSoundPreviewService}. `withAudioNotificationInterceptor()`
 * applies the interceptor's own table, so a preview always plays what the notification would.
 *
 * @public
 */
export interface INotificationSoundPreviewConfig {
    // #region Properties

    /**
     * Sound played for a severity the table does not name.
     */
    readonly defaultSound?: string;

    /**
     * Volume, loop and seek settings handed to the player for every sound.
     */
    readonly options?: IAudioPlayOptions;

    /**
     * Sound source per severity.
     */
    readonly sounds: Partial<Record<NotificationType, string>>;

    // #endregion
}
