import { fromCalendarDate } from './fromCalendarDate';

const CALENDAR_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;

export function toLocalMidnight(day: Date | string): Date | undefined {
    if (typeof day === 'string') {
        return CALENDAR_DATE_PATTERN.test(day) ? (fromCalendarDate(day) ?? undefined) : undefined;
    }
    if (Number.isNaN(day.getTime())) {
        return undefined;
    }

    return new Date(day.getFullYear(), day.getMonth(), day.getDate());
}
