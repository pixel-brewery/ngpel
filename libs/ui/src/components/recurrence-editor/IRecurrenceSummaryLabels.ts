import type { RecurrenceFrequency } from './RecurrenceRule';

/** Translated sentence fragments used to describe a recurrence. @public */
export interface IRecurrenceSummaryLabels {
    readonly none: string;
    readonly never: string;
    readonly every: (frequency: Exclude<RecurrenceFrequency, 'NONE'>, interval: number) => string;
    readonly onWeekdays: (weekdays: string) => string;
    readonly onMonthDay: (day: number) => string;
    readonly onOrdinalWeekday: (ordinal: string, weekday: string) => string;
    readonly atTime: (time: string) => string;
    readonly until: (date: string) => string;
    readonly count: (occurrences: number) => string;
}
