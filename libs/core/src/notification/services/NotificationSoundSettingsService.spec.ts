import { describe, expect, it } from 'vitest';
import { NotificationType } from '../models/NotificationType';
import { DEFAULT_NOTIFICATION_SOUND_SETTINGS } from './DEFAULT_NOTIFICATION_SOUND_SETTINGS';
import { NotificationSoundSettingsService } from './NotificationSoundSettingsService';

describe('NotificationSoundSettingsService', () => {
    it('starts a session with every severity audible', () => {
        // Arrange
        const service = new NotificationSoundSettingsService();

        // Act
        const settings = service.settings();

        // Assert
        expect(settings).toEqual(DEFAULT_NOTIFICATION_SOUND_SETTINGS);
    });

    it('completes partial preferences with the defaults', () => {
        // Arrange
        const service = new NotificationSoundSettingsService();

        // Act
        service.set({ error: false });

        // Assert
        expect(service.settings()).toEqual({ error: false, info: true, success: true, warning: true });
    });

    it('restores the defaults when the preferences are cleared', () => {
        // Arrange
        const service = new NotificationSoundSettingsService();
        service.set({ error: false, info: false, success: false, warning: false });

        // Act
        service.set(null);

        // Assert
        expect(service.settings()).toEqual(DEFAULT_NOTIFICATION_SOUND_SETTINGS);
    });

    it('changes one severity without touching the others', () => {
        // Arrange
        const service = new NotificationSoundSettingsService();

        // Act
        service.setEnabled('warning', false);

        // Assert
        expect(service.settings()).toEqual({ error: true, info: true, success: true, warning: false });
    });

    it.each([
        [NotificationType.Error, 'error'],
        [NotificationType.Info, 'info'],
        [NotificationType.Success, 'success'],
        [NotificationType.Warning, 'warning'],
    ] as const)('reports %s as silenced once its preference is switched off', (type, key) => {
        // Arrange
        const service = new NotificationSoundSettingsService();
        service.setEnabled(key, false);

        // Act
        const isEnabled = service.isEnabled(type);

        // Assert
        expect(isEnabled).toBe(false);
    });

    it('never silences an ungraded notification, which has no preference of its own', () => {
        // Arrange
        const service = new NotificationSoundSettingsService();
        service.set({ error: false, info: false, success: false, warning: false });

        // Act
        const isEnabled = service.isEnabled(NotificationType.None);

        // Assert
        expect(isEnabled).toBe(true);
    });
});
