// #region Imports

import type { IAudioPlayOptions } from '@pixel-brewery/ngpel-core/audio';
import type { INotification } from '../models/INotification';
import type { NotificationType } from '../models/NotificationType';

// #endregion

/**
 * Options of the {@link AudioNotificationInterceptor}. The sound table is the only required part:
 * this package ships no audio assets, so the composing application names its own files.
 *
 * @public
 */
export interface IAudioNotificationInterceptorConfig {
    // #region Properties

    /**
     * Sound played for a severity the table does not name. Without one such a notification stays
     * silent.
     */
    readonly defaultSound?: string;

    /**
     * When `true` the interceptor stays registered but plays nothing.
     */
    readonly isDisabled?: boolean;

    /**
     * Per-notification gate consulted before a sound is played.
     * `withAudioNotificationInterceptor()` defaults it to the user's sound preferences.
     */
    readonly isEnabled?: (notification: INotification) => boolean;

    /**
     * Diagnostic channel that receives rejected playback; defaults to the global console.
     */
    readonly logger?: Pick<Console, 'error'>;

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
