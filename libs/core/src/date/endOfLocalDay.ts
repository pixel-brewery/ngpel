import { toLocalInstant } from './toLocalInstant';
import { toLocalMidnight } from './toLocalMidnight';

/**
 * Resolves the last millisecond of a local calendar day as an RFC 3339 date-time with the local offset.
 *
 * Use it for the inclusive upper bound of a filter that lets the user pick days for a point-in-time field, such as
 * "created until". A day of 23 or 25 hours at a daylight-saving change is covered completely.
 *
 * @param day - Calendar day.
 * @returns The last instant of the day, or `undefined` when the value is no date.
 * @public
 */
export function endOfLocalDay(day: Date | string): string | undefined {
    const start = toLocalMidnight(day);
    if (!start) {
        return undefined;
    }

    const nextDay = new Date(start);
    nextDay.setDate(nextDay.getDate() + 1);

    return toLocalInstant(new Date(nextDay.getTime() - 1));
}
