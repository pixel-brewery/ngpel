import { toLocalInstant } from './toLocalInstant';
import { toLocalMidnight } from './toLocalMidnight';

/**
 * Resolves the first instant of a local calendar day as an RFC 3339 date-time with the local offset.
 *
 * Use it for the lower bound of a filter that lets the user pick days for a point-in-time field, such as "created
 * from". The day comes from a date control (`Date`) or in its transport form `YYYY-MM-DD`.
 *
 * @param day - Calendar day.
 * @returns The first instant of the day, or `undefined` when the value is no date.
 * @public
 */
export function startOfLocalDay(day: Date | string): string | undefined {
    const start = toLocalMidnight(day);

    return start ? toLocalInstant(start) : undefined;
}
