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

    it('round-trips legacy weekday lists in calendar order without duplicate days', () => {
        const recurrence = parseRecurrenceRule('FREQ=WEEKLY;BYDAY=FR,MO,mo,FR;BYHOUR=8;BYMINUTE=30');

        const rule = createRecurrenceRule(recurrence);

        expect(rule).toBe('FREQ=WEEKLY;BYDAY=MO,FR;BYHOUR=8;BYMINUTE=30');
    });

    it.each([
        ['FREQ=DAILY;UNTIL=20270328', undefined],
        ['FREQ=DAILY', '2027-03-28'],
    ])('interprets a legacy date-only end as the inclusive local instant (%s)', (rule, recurrenceEndAt) => {
        // Arrange
        const end = new Date(2027, 2, 28, 23, 59, 59).toISOString();

        // Act
        const recurrence = parseRecurrenceRule(rule, { recurrenceEndAt, endDateMode: 'calendar-day' });

        // Assert
        expect(recurrence.recurrenceEndMode).toBe('UNTIL');
        expect(recurrence.recurrenceEndAt).toBe(end);
    });

    it('preserves the original instant of a timed end when opening a calendar-day series', () => {
        // Arrange
        const rule = 'FREQ=DAILY;UNTIL=20270328T223000Z';

        // Act
        const recurrence = parseRecurrenceRule(rule, { endDateMode: 'calendar-day' });

        // Assert
        expect(recurrence.recurrenceEndAt).toBe('2027-03-28T22:30:00.000Z');
    });
});
