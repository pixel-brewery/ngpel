import { endOfLocalDay, startOfLocalDay } from '@pixel-brewery/ngpel-core';
import type { IDateFilterRange } from './filterValues';
import type { FilterValues } from './IFilterDefinition';
import { resolveDateFilterDay } from './resolveDateFilterDay';

/**
 * Resolves a filter on an instant to the inclusive boundaries of the selected browser-local day.
 * Each boundary is an RFC 3339 date-time with its own local offset.
 *
 * @public
 * @param values Current filter values.
 * @param key The instant field key.
 * @returns Inclusive local day bounds, or an empty range if the day is missing or invalid.
 */
export function getLocalDayFilterRange(values: FilterValues, key: string): IDateFilterRange {
    const date = resolveDateFilterDay(values, key);
    if (!date) {
        return {};
    }

    const from = startOfLocalDay(date);
    const to = endOfLocalDay(date);

    return from && to ? { from, to } : {};
}
