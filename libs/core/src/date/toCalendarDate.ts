// #region Imports

import { formatCalendarDay } from './calendarDay';

// #endregion

/**
 * Formats the local calendar day shown by a date control as `YYYY-MM-DD`.
 *
 * @public
 * @param value Date from the control.
 * @returns The calendar day or `undefined` for an invalid date.
 */
export function toCalendarDate(value: Date): string | undefined {
    if (Number.isNaN(value.getTime())) {
        return undefined;
    }

    return formatCalendarDay(value.getFullYear(), value.getMonth() + 1, value.getDate());
}
