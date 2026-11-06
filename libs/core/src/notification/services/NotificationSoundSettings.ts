// #region Imports

import type { NotificationSoundSettingKey } from './NotificationSoundSettingKey';

// #endregion

/**
 * Whether a notification sound is wanted, per severity a user can silence.
 *
 * @public
 */
export type NotificationSoundSettings = Readonly<Record<NotificationSoundSettingKey, boolean>>;
