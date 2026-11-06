import { describe, expect, it } from 'vitest';
import { LONG_DURATION } from './LONG_DURATION';
import { SHORT_DURATION } from './SHORT_DURATION';

describe('LONG_DURATION', () => {
    it('is the thirty second lifetime of a notification a user has to read', () => {
        // Arrange
        const duration = LONG_DURATION;

        // Act
        const seconds = duration / 1_000;

        // Assert
        expect(seconds).toBe(30);
    });

    it('is not the lifetime an ordinary notification gets', () => {
        // Arrange
        const duration = LONG_DURATION;

        // Act
        const isOrdinaryLifetime = duration <= SHORT_DURATION;

        // Assert
        expect(isOrdinaryLifetime).toBe(false);
    });
});
