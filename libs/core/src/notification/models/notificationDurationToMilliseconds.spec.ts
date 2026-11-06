import { describe, expect, it } from 'vitest';
import { LONG_DURATION } from './LONG_DURATION';
import { notificationDurationToMilliseconds } from './notificationDurationToMilliseconds';
import { SHORT_DURATION } from './SHORT_DURATION';

describe('notificationDurationToMilliseconds', () => {
    it('resolves the long duration to its lifetime', () => {
        // Arrange
        const duration = 'long';

        // Act
        const milliseconds = notificationDurationToMilliseconds(duration);

        // Assert
        expect(milliseconds).toBe(LONG_DURATION);
    });

    it('resolves the short duration to its lifetime', () => {
        // Arrange
        const duration = 'short';

        // Act
        const milliseconds = notificationDurationToMilliseconds(duration);

        // Assert
        expect(milliseconds).toBe(SHORT_DURATION);
    });

    it('never answers the long lifetime for a duration that is not long', () => {
        // Arrange
        const duration = 'short';

        // Act
        const milliseconds = notificationDurationToMilliseconds(duration);

        // Assert
        expect(milliseconds).not.toBe(LONG_DURATION);
    });
});
