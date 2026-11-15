import { fromCalendarDate } from '@pixel-brewery/ngpel-core';
import { getDateFilterValue } from './filterValues';
import type { FilterValues } from './IFilterDefinition';

export function resolveDateFilterDay(values: FilterValues, key: string): Date | undefined {
    const value = getDateFilterValue(values, key);
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? undefined : value;
    }

    // Persisted filters may contain a date-only string or the serialized date control value.
    return typeof value === 'string' ? (fromCalendarDate(value.trim()) ?? undefined) : undefined;
}
