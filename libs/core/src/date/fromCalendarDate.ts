// #region Imports

import { parseCalendarDay } from './calendarDay';

// #endregion

/**
 * Creates the local date shown by a date control for a stored calendar day.
 *
 * Accepts `YYYY-MM-DD` and legacy date-times. A date-time at midnight UTC uses its UTC day.
 * Other date-times are interpreted in the browser's local time zone.
 *
 * @public
 * @param value Stored calendar date.
 * @returns The local date or `null` when the input is empty or invalid.
 */
export function fromCalendarDate(value: string | null | undefined): Date | null {
    const day = parseCalendarDay(value);
    if (!day) {
        return null;
    }

    const localMidnight = new Date(2000, day.month - 1, day.day);
    localMidnight.setFullYear(day.year, day.month - 1, day.day);

    return localMidnight;
}
