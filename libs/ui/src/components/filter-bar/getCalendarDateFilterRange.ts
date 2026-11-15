import { toCalendarDate } from '@pixel-brewery/ngpel-core';
import type { IDateFilterRange } from './filterValues';
import type { FilterValues } from './IFilterDefinition';
import { resolveDateFilterDay } from './resolveDateFilterDay';

/**
 * Resolves a calendar-day filter to the selected `YYYY-MM-DD` value at both bounds.
 *
 * @public
 * @param values Current filter values.
 * @param key The calendar-day field key.
 * @returns Equal date-only bounds, or an empty range if the day is missing or invalid.
 */
export function getCalendarDateFilterRange(values: FilterValues, key: string): IDateFilterRange {
    const date = resolveDateFilterDay(values, key);
    const day = date ? toCalendarDate(date) : undefined;

    return day ? { from: day, to: day } : {};
}
