import type { RecurrenceFrequency, RecurrenceWeekday } from './RecurrenceRule';

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
    /** Additional description for a one-off occurrence. */
    readonly noneDetail?: string;
    /** Optional time description for an all-day recurrence. */
    readonly allDay?: string;
    /** Formats weekday names for the summary. */
    readonly weekday?: (weekday: RecurrenceWeekday) => string;
    /** Joins the names in a weekly recurrence. */
    readonly joinWeekdays?: (weekdays: ReadonlyArray<string>) => string;
    /** Formats a validated local time in HH:mm form. */
    readonly formatTime?: (time: string) => string;
    /** Formats the recurrence's final calendar day. */
    readonly formatDate?: (date: Date) => string;
    /** Joins the frequency sentence and the additional descriptions. */
    readonly joinHead?: (frequency: string, details: ReadonlyArray<string>) => string;
}
