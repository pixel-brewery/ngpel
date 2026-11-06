const CALENDAR_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/u;
const DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T/u;
const DAY_IN_MILLISECONDS = 86_400_000;

interface ICalendarDay {
    readonly year: number;
    readonly month: number;
    readonly day: number;
}

export function parseCalendarDay(value: string | null | undefined): ICalendarDay | undefined {
    if (!value) {
        return undefined;
    }

    const calendarDate = CALENDAR_DATE_PATTERN.exec(value);
    if (calendarDate) {
        const year = Number(calendarDate[1]);
        const month = Number(calendarDate[2]);
        const day = Number(calendarDate[3]);
        const utc = new Date(0);
        utc.setUTCFullYear(year, month - 1, day);

        return utc.getUTCFullYear() === year && utc.getUTCMonth() === month - 1 && utc.getUTCDate() === day ? { year, month, day } : undefined;
    }

    if (!DATE_TIME_PATTERN.test(value)) {
        return undefined;
    }

    const instant = new Date(value);
    if (Number.isNaN(instant.getTime())) {
        return undefined;
    }

    return instant.getTime() % DAY_IN_MILLISECONDS === 0
        ? { year: instant.getUTCFullYear(), month: instant.getUTCMonth() + 1, day: instant.getUTCDate() }
        : { year: instant.getFullYear(), month: instant.getMonth() + 1, day: instant.getDate() };
}

export function formatCalendarDay(year: number, month: number, day: number): string {
    return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
