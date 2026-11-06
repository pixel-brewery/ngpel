// #region Imports

// #endregion

export type RecurrenceEndMode = 'COUNT' | 'NEVER' | 'UNTIL';

export type RecurrenceFrequency = 'DAILY' | 'MONTHLY' | 'NONE' | 'WEEKLY' | 'YEARLY';

export type RecurrenceMonthlyMode = 'DAY_OF_MONTH' | 'WEEKDAY_OF_MONTH';

export type RecurrenceWeekday = 'FR' | 'MO' | 'SA' | 'SU' | 'TH' | 'TU' | 'WE';

export interface IRecurrenceOption<TValue extends string | number> {
    readonly value: TValue;
}

export interface IRecurrenceValue {
    recurrenceByDays: string;
    recurrenceCount: string;
    recurrenceEndAt: string;
    recurrenceEndMode: RecurrenceEndMode;
    recurrenceFrequency: RecurrenceFrequency;
    recurrenceInterval: string;
    recurrenceMonthDay: string;
    recurrenceMonthlyMode: RecurrenceMonthlyMode;
    recurrenceWeekday: RecurrenceWeekday;
    recurrenceWeekdayOrdinal: string;
}

export interface IParseRecurrenceRuleOptions {
    readonly recurrenceEndAt?: null | string;
}

export const RECURRENCE_INTERVAL_OPTIONS: ReadonlyArray<IRecurrenceOption<number>> = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 6 },
    { value: 12 },
];

export const RECURRENCE_WEEKDAY_OPTIONS: ReadonlyArray<IRecurrenceOption<RecurrenceWeekday>> = [
    { value: 'MO' },
    { value: 'TU' },
    { value: 'WE' },
    { value: 'TH' },
    { value: 'FR' },
    { value: 'SA' },
    { value: 'SU' },
];

export const RECURRENCE_MONTHLY_MODE_OPTIONS: ReadonlyArray<IRecurrenceOption<RecurrenceMonthlyMode>> = [
    { value: 'DAY_OF_MONTH' },
    { value: 'WEEKDAY_OF_MONTH' },
];

export const RECURRENCE_WEEKDAY_ORDINAL_OPTIONS: ReadonlyArray<IRecurrenceOption<string>> = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '-1' },
];

export const RECURRENCE_END_MODE_OPTIONS: ReadonlyArray<IRecurrenceOption<RecurrenceEndMode>> = [{ value: 'NEVER' }, { value: 'UNTIL' }, { value: 'COUNT' }];

export const RECURRENCE_DEFAULT_VALUE: IRecurrenceValue = {
    recurrenceByDays: 'MO',
    recurrenceCount: '10',
    recurrenceEndAt: '',
    recurrenceEndMode: 'NEVER',
    recurrenceFrequency: 'NONE',
    recurrenceInterval: '1',
    recurrenceMonthDay: '1',
    recurrenceMonthlyMode: 'DAY_OF_MONTH',
    recurrenceWeekday: 'MO',
    recurrenceWeekdayOrdinal: '1',
};

export function createRecurrenceRule(value: IRecurrenceValue): null | string {
    if (value.recurrenceFrequency === 'NONE') {
        return null;
    }

    const interval = toPositiveInteger(value.recurrenceInterval);
    const ruleParts = [`FREQ=${value.recurrenceFrequency}`];

    if (interval > 1) {
        ruleParts.push(`INTERVAL=${interval}`);
    }

    if (value.recurrenceFrequency === 'WEEKLY') {
        const byDays = normalizeRecurrenceByDays(value.recurrenceByDays);
        ruleParts.push(`BYDAY=${byDays.join(',')}`);
    }

    if (value.recurrenceFrequency === 'MONTHLY') {
        if (value.recurrenceMonthlyMode === 'DAY_OF_MONTH') {
            ruleParts.push(`BYMONTHDAY=${toMonthDay(value.recurrenceMonthDay)}`);
        } else {
            ruleParts.push(`BYDAY=${toWeekdayOrdinal(value.recurrenceWeekdayOrdinal)}${value.recurrenceWeekday}`);
        }
    }

    if (value.recurrenceEndMode === 'COUNT') {
        ruleParts.push(`COUNT=${toPositiveInteger(value.recurrenceCount)}`);
    }

    return ruleParts.join(';');
}

export function parseRecurrenceRule(value: null | string | undefined, options: IParseRecurrenceRuleOptions = {}): IRecurrenceValue {
    if (!value) {
        return { ...RECURRENCE_DEFAULT_VALUE };
    }

    const frequency = /FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)/u.exec(value)?.[1] as RecurrenceFrequency | undefined;
    const interval = /INTERVAL=(\d+)/u.exec(value)?.[1] ?? '1';
    const byDay = /BYDAY=([^;]+)/u.exec(value)?.[1];
    const byMonthDay = /BYMONTHDAY=(-?\d+)/u.exec(value)?.[1];
    const count = /COUNT=(\d+)/u.exec(value)?.[1] ?? RECURRENCE_DEFAULT_VALUE.recurrenceCount;
    const recurrenceEndMode: RecurrenceEndMode = /COUNT=\d+/u.test(value) ? 'COUNT' : options.recurrenceEndAt ? 'UNTIL' : 'NEVER';

    if (!frequency) {
        return { ...RECURRENCE_DEFAULT_VALUE };
    }

    if (frequency === 'WEEKLY' && byDay) {
        return {
            ...RECURRENCE_DEFAULT_VALUE,
            recurrenceByDays: normalizeRecurrenceByDays(byDay).join(','),
            recurrenceCount: count,
            recurrenceEndMode,
            recurrenceFrequency: frequency,
            recurrenceInterval: interval,
        };
    }

    if (frequency === 'MONTHLY' && byDay) {
        const weekdayMatch = /^(-?\d)?(MO|TU|WE|TH|FR|SA|SU)$/u.exec(byDay.split(',')[0]?.trim() ?? '');

        if (weekdayMatch) {
            return {
                ...RECURRENCE_DEFAULT_VALUE,
                recurrenceCount: count,
                recurrenceEndMode,
                recurrenceFrequency: frequency,
                recurrenceInterval: interval,
                recurrenceMonthlyMode: 'WEEKDAY_OF_MONTH',
                recurrenceWeekday: weekdayMatch[2] as RecurrenceWeekday,
                recurrenceWeekdayOrdinal: weekdayMatch[1] ?? RECURRENCE_DEFAULT_VALUE.recurrenceWeekdayOrdinal,
            };
        }
    }

    return {
        ...RECURRENCE_DEFAULT_VALUE,
        recurrenceCount: count,
        recurrenceEndMode,
        recurrenceFrequency: frequency,
        recurrenceInterval: interval,
        recurrenceMonthDay: byMonthDay ?? RECURRENCE_DEFAULT_VALUE.recurrenceMonthDay,
        recurrenceMonthlyMode: frequency === 'MONTHLY' && byMonthDay ? 'DAY_OF_MONTH' : 'DAY_OF_MONTH',
    };
}

export function normalizeRecurrenceByDays(value: string): ReadonlyArray<RecurrenceWeekday> {
    const values = value
        .split(',')
        .map((entry) => entry.trim())
        .filter((entry): entry is RecurrenceWeekday => RECURRENCE_WEEKDAY_OPTIONS.some((option) => option.value === entry));

    return values.length > 0 ? values : ['MO'];
}

export function toPositiveInteger(value: string): number {
    const numberValue = Number(value.trim());

    return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : 1;
}

function toMonthDay(value: string): number {
    const numberValue = toPositiveInteger(value);

    return Math.min(numberValue, 31);
}

function toWeekdayOrdinal(value: string): string {
    return RECURRENCE_WEEKDAY_ORDINAL_OPTIONS.some((option) => option.value === value) ? value : '1';
}
