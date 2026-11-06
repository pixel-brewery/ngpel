import { fromCalendarDate } from '@pixel-brewery/ngpel-core';
import type { IRecurrenceSummaryLabels } from './IRecurrenceSummaryLabels';
import { type IRecurrenceValue, normalizeRecurrenceByDays, RECURRENCE_WEEKDAY_OPTIONS, type RecurrenceWeekday, toPositiveInteger } from './RecurrenceRule';
import { recurrenceTime } from './recurrenceTime';

const UNITS = { DAILY: 'day', WEEKLY: 'week', MONTHLY: 'month', YEARLY: 'year' } as const;
const DEFAULT_LABELS: IRecurrenceSummaryLabels = {
    none: 'No recurrence',
    never: 'No end date',
    every: (frequency, interval) => (interval === 1 ? `Every ${UNITS[frequency]}` : `Every ${interval} ${UNITS[frequency]}s`),
    onWeekdays: (weekdays) => `on ${weekdays}`,
    onMonthDay: (day) => `on day ${day}`,
    onOrdinalWeekday: (ordinal, weekday) =>
        `on the ${ordinal === '-1' ? 'last' : (['first', 'second', 'third', 'fourth'][Number(ordinal) - 1] ?? 'first')} ${weekday}`,
    atTime: (time) => `at ${time}`,
    until: (date) => `Until ${date}`,
    count: (occurrences) => (occurrences === 1 ? 'After one occurrence' : `After ${occurrences} occurrences`),
};

/**
 * Describes the frequency and end condition for read-only recurrence fields.
 *
 * @public
 * @param value Recurrence to describe.
 * @param labels Optional application translations for sentence fragments.
 * @param locale Locale for dates, weekdays and time.
 * @returns The recurrence description and a separate end-condition description.
 */
export function describeRecurrence(
    value: IRecurrenceValue | null | undefined,
    labels: Partial<IRecurrenceSummaryLabels> = {},
    locale = 'en',
): { readonly head: string; readonly detail: string } {
    const intl = { ...DEFAULT_LABELS, ...labels };
    if (!value || value.recurrenceFrequency === 'NONE') {
        return { head: intl.none, detail: '' };
    }

    const fragments = [intl.every(value.recurrenceFrequency, toPositiveInteger(value.recurrenceInterval))];
    const weekday = (day: RecurrenceWeekday): string => {
        const index = RECURRENCE_WEEKDAY_OPTIONS.findIndex((option) => option.value === day);
        return new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2020, 0, 6 + Math.max(0, index))));
    };
    if (value.recurrenceFrequency === 'WEEKLY') {
        const days = normalizeRecurrenceByDays(value.recurrenceByDays).map(weekday);
        fragments.push(intl.onWeekdays(new Intl.ListFormat(locale).format(days)));
    } else if (value.recurrenceFrequency === 'MONTHLY') {
        fragments.push(
            value.recurrenceMonthlyMode === 'DAY_OF_MONTH'
                ? intl.onMonthDay(Math.min(31, toPositiveInteger(value.recurrenceMonthDay)))
                : intl.onOrdinalWeekday(value.recurrenceWeekdayOrdinal, weekday(value.recurrenceWeekday)),
        );
    }
    const time = recurrenceTime(value.recurrenceTime);
    if (time) {
        fragments.push(
            intl.atTime(
                new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(
                    new Date(Date.UTC(2020, 0, 1, time.hours, time.minutes)),
                ),
            ),
        );
    }

    const end = value.recurrenceEndMode === 'UNTIL' ? fromCalendarDate(value.recurrenceEndAt) : null;
    const detail = end
        ? intl.until(new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(end))
        : value.recurrenceEndMode === 'COUNT'
          ? intl.count(toPositiveInteger(value.recurrenceCount))
          : intl.never;

    return { head: fragments.join(' '), detail };
}
