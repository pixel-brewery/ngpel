// #region Imports

import { Injectable, signal, type Signal, type WritableSignal } from '@angular/core';
import { NotificationType } from '../models/NotificationType';
import { DEFAULT_NOTIFICATION_SOUND_SETTINGS } from './DEFAULT_NOTIFICATION_SOUND_SETTINGS';
import type { NotificationSoundSettingKey } from './NotificationSoundSettingKey';
import type { NotificationSoundSettings } from './NotificationSoundSettings';

// #endregion

/**
 * Holds the user's notification sound preferences for the running session and answers the gate the
 * {@link AudioNotificationInterceptor} consults before it plays anything.
 *
 * The service is deliberately in-memory: persistence is a product concern, so an application that
 * stores the preferences on a user profile writes them back with
 * {@link NotificationSoundSettingsService.set} whenever the profile is loaded or changed.
 *
 * Registered by `withAudioNotificationInterceptor()`.
 *
 * @public
 */
@Injectable()
export class NotificationSoundSettingsService {
    // #region Fields

    private readonly _settings: WritableSignal<NotificationSoundSettings> = signal(DEFAULT_NOTIFICATION_SOUND_SETTINGS);

    // #endregion

    // #region Properties

    /**
     * The preferences of the running session.
     *
     * @public
     * @readonly
     */
    public get settings(): Signal<NotificationSoundSettings> {
        return this._settings.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Replaces the preferences, filling every severity the argument leaves out with its default.
     *
     * @public
     * @param settings The preferences to apply; `null` or omitted restores the defaults.
     */
    public set(settings?: Partial<NotificationSoundSettings> | null): void {
        this._settings.set(this.normalize(settings));
    }

    /**
     * Changes the preference of one severity.
     *
     * @public
     * @param key The severity to change.
     * @param isEnabled Whether its sound is wanted.
     */
    public setEnabled(key: NotificationSoundSettingKey, isEnabled: boolean): void {
        this._settings.update((current) => ({ ...current, [key]: isEnabled }));
    }

    /**
     * Reports whether a sound is wanted for a severity. An ungraded notification has no preference
     * and is always allowed.
     *
     * @public
     * @param type The severity of the notification.
     */
    public isEnabled(type: NotificationType): boolean {
        const key = this.toSettingKey(type);

        if (!key) {
            return true;
        }

        return this._settings()[key];
    }

    /**
     * Completes partial preferences with the defaults.
     *
     * @param settings The preferences to complete.
     * @returns Preferences stating every severity.
     */
    private normalize(settings?: Partial<NotificationSoundSettings> | null): NotificationSoundSettings {
        return {
            error: typeof settings?.error === 'boolean' ? settings.error : DEFAULT_NOTIFICATION_SOUND_SETTINGS.error,
            info: typeof settings?.info === 'boolean' ? settings.info : DEFAULT_NOTIFICATION_SOUND_SETTINGS.info,
            success: typeof settings?.success === 'boolean' ? settings.success : DEFAULT_NOTIFICATION_SOUND_SETTINGS.success,
            warning: typeof settings?.warning === 'boolean' ? settings.warning : DEFAULT_NOTIFICATION_SOUND_SETTINGS.warning,
        };
    }

    /**
     * Maps a severity onto the preference key that gates it.
     *
     * @param type The severity of the notification.
     * @returns The preference key, or `null` for an ungraded notification.
     */
    private toSettingKey(type: NotificationType): NotificationSoundSettingKey | null {
        switch (type) {
            case NotificationType.Error:
                return 'error';
            case NotificationType.Info:
                return 'info';
            case NotificationType.Success:
                return 'success';
            case NotificationType.Warning:
                return 'warning';
            default:
                return null;
        }
    }

    // #endregion
}
