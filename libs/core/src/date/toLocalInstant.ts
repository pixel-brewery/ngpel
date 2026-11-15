import { formatCalendarDay } from './calendarDay';

const MINUTE_IN_MILLISECONDS = 60_000;

/**
 * Formats an instant as an RFC 3339 date-time with the browser's local offset, e.g.
 * `2026-09-15T00:00:00.000+02:00`.
 *
 * The value names exactly the same instant as `toISOString()` and additionally keeps the user's local wall-clock time
 * and offset, which the API accepts for every point in time.
 *
 * @param value - Instant.
 * @returns The date-time with offset, or `undefined` for an invalid date.
 * @public
 */
export function toLocalInstant(value: Date): string | undefined {
    if (Number.isNaN(value.getTime())) {
        return undefined;
    }

    const offsetMinutes = -Math.round(value.getTimezoneOffset());
    const wallClock = new Date(value.getTime() + offsetMinutes * MINUTE_IN_MILLISECONDS);
    const absoluteOffset = Math.abs(offsetMinutes);

    return (
        formatCalendarDay(wallClock.getUTCFullYear(), wallClock.getUTCMonth() + 1, wallClock.getUTCDate()) +
        `T${pad(wallClock.getUTCHours())}:${pad(wallClock.getUTCMinutes())}:${pad(wallClock.getUTCSeconds())}` +
        `.${String(wallClock.getUTCMilliseconds()).padStart(3, '0')}` +
        `${offsetMinutes < 0 ? '-' : '+'}${pad(Math.trunc(absoluteOffset / 60))}:${pad(absoluteOffset % 60)}`
    );
}

function pad(value: number): string {
    return String(value).padStart(2, '0');
}
