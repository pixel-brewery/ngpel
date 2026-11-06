import { describe, expect, it } from 'vitest';
import { LONG_DURATION } from './LONG_DURATION';
import { SHORT_DURATION } from './SHORT_DURATION';

describe('SHORT_DURATION', () => {
    it('is the fifteen second lifetime of an ordinary notification', () => {
        // Arrange
        const duration = SHORT_DURATION;

        // Act
        const seconds = duration / 1_000;

        // Assert
        expect(seconds).toBe(15);
    });

    it('does not outlive a notification that asked for the long lifetime', () => {
        // Arrange
        const short = SHORT_DURATION;

        // Act
        const outlivesLong = short >= LONG_DURATION;

        // Assert
        expect(outlivesLong).toBe(false);
    });
});
