import { describe, expect, it } from 'vitest';
import { createRecurrenceRule, parseRecurrenceRule, RECURRENCE_DEFAULT_VALUE } from './RecurrenceRule';

describe('recurrence rule', () => {
    it('round-trips wall-clock time and a date-only end in a self-contained rule', () => {
        // Arrange
        const recurrence = {
            ...RECURRENCE_DEFAULT_VALUE,
            recurrenceFrequency: 'WEEKLY' as const,
            recurrenceByDays: 'MO,FR',
            recurrenceEndMode: 'UNTIL' as const,
            recurrenceEndAt: '2027-01-05',
            recurrenceTime: '08:30',
        };

        // Act
        const rule = createRecurrenceRule(recurrence, { includeUntil: true });

        // Assert
        expect(rule).toBe('FREQ=WEEKLY;BYDAY=MO,FR;BYHOUR=8;BYMINUTE=30;UNTIL=20270105');
        expect(parseRecurrenceRule(rule)).toEqual(recurrence);
    });

    it('keeps end instants separate by default for existing consumers', () => {
        // Arrange
        const recurrence = {
            ...RECURRENCE_DEFAULT_VALUE,
            recurrenceFrequency: 'DAILY' as const,
            recurrenceEndMode: 'UNTIL' as const,
            recurrenceEndAt: '2027-01-05T08:30:00.000Z',
        };

        // Act
        const rule = createRecurrenceRule(recurrence);

        // Assert
        expect(rule).toBe('FREQ=DAILY');
        expect(parseRecurrenceRule(rule, { recurrenceEndAt: recurrence.recurrenceEndAt })).toEqual(recurrence);
    });
});
