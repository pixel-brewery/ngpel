import { describe, expect, it } from 'vitest';
import { nextRecurrenceChoiceDate } from './nextRecurrenceChoiceDate';

describe('nextRecurrenceChoiceDate', () => {
    it('shows the following week for a matching weekday', () => {
        // Arrange
        const from = new Date(2026, 11, 28, 16);

        // Act
        const date = nextRecurrenceChoiceDate(from, 'MO');

        // Assert
        expect(date).toEqual(new Date(2027, 0, 4));
    });

    it('advances to the next month after the last Friday passes', () => {
        // Arrange
        const from = new Date(2026, 11, 26, 12);

        // Act
        const date = nextRecurrenceChoiceDate(from, 'FR', '-1');

        // Assert
        expect(date).toEqual(new Date(2027, 0, 29));
    });
});
