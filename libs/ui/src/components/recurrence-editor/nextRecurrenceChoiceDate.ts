import { RECURRENCE_WEEKDAY_OPTIONS, type RecurrenceWeekday } from './RecurrenceRule';

/** Finds the next calendar day for a weekday or an ordinal weekday choice. @internal */
export function nextRecurrenceChoiceDate(from: Date, weekday: RecurrenceWeekday, ordinal?: string): Date {
    const weekdayIndex = (RECURRENCE_WEEKDAY_OPTIONS.findIndex(({ value }) => value === weekday) + 1) % 7;
    const start = new Date(from.getTime());
    start.setHours(0, 0, 0, 0);
    if (ordinal === undefined) {
        const daysAhead = (weekdayIndex - start.getDay() + 7) % 7 || 7;
        start.setDate(start.getDate() + daysAhead);
        return start;
    }

    const candidate = ordinalWeekday(start, start.getMonth(), weekdayIndex, ordinal);
    return candidate >= start ? candidate : ordinalWeekday(start, start.getMonth() + 1, weekdayIndex, ordinal);
}

function ordinalWeekday(start: Date, month: number, weekday: number, ordinal: string): Date {
    const date = new Date(start.getTime());
    if (ordinal === '-1') {
        date.setMonth(month + 1, 0);
        date.setDate(date.getDate() - ((date.getDay() - weekday + 7) % 7));
    } else {
        const position = Number(ordinal);
        const weekOffset = position >= 1 && position <= 4 && Number.isInteger(position) ? (position - 1) * 7 : 0;
        date.setMonth(month, 1);
        date.setDate(1 + ((weekday - date.getDay() + 7) % 7) + weekOffset);
    }
    return date;
}
