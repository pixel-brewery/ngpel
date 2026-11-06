// #region Imports

import type { NotificationSoundSettings } from './NotificationSoundSettings';

// #endregion

/**
 * Sound preferences a session starts with: every severity audible, so a product that never wires
 * persistence still behaves as its sound table describes.
 *
 * @public
 */
export const DEFAULT_NOTIFICATION_SOUND_SETTINGS: NotificationSoundSettings = {
    error: true,
    info: true,
    success: true,
    warning: true,
};
