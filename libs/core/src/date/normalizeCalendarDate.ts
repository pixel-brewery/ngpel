// #region Imports

import { formatCalendarDay, parseCalendarDay } from './calendarDay';

// #endregion

/**
 * Normalizes a date-only value or legacy calendar date-time to `YYYY-MM-DD`.
 *
 * @public
 * @param value Stored calendar date.
 * @returns The normalized day or `undefined` when the input is empty or invalid.
 */
export function normalizeCalendarDate(value: string | null | undefined): string | undefined {
    const day = parseCalendarDay(value);

    return day ? formatCalendarDay(day.year, day.month, day.day) : undefined;
}
