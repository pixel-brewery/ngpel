import { describe, expect, it } from 'vitest';
import { DEFAULT_NOTIFICATION_SOUND_SETTINGS } from './DEFAULT_NOTIFICATION_SOUND_SETTINGS';

describe('DEFAULT_NOTIFICATION_SOUND_SETTINGS', () => {
    it('states a preference for every severity a user can silence', () => {
        // Arrange
        const settings = DEFAULT_NOTIFICATION_SOUND_SETTINGS;

        // Act
        const keys = Object.keys(settings).sort();

        // Assert
        expect(keys).toEqual(['error', 'info', 'success', 'warning']);
    });

    it('silences no severity, so an unconfigured product hears what its sound table describes', () => {
        // Arrange
        const settings = DEFAULT_NOTIFICATION_SOUND_SETTINGS;

        // Act
        const silenced = Object.values(settings).filter((isEnabled) => !isEnabled);

        // Assert
        expect(silenced).toEqual([]);
    });
});
