/**
 * The severities a user can silence individually. {@link NotificationType.None} has no key: an
 * ungraded notification is never gated by a sound preference.
 *
 * @public
 */
export type NotificationSoundSettingKey = 'error' | 'info' | 'success' | 'warning';
