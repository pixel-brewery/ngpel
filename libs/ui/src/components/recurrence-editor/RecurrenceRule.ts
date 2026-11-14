// #region Imports

import { fromCalendarDate } from '@pixel-brewery/ngpel-core';
import { recurrenceTime } from './recurrenceTime';
import { toCalendarDayEnd } from './toCalendarDayEnd';

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
    /** Optional local wall-clock time in HH:mm form. Omit for all-day recurrence. */
    recurrenceTime?: string;
}

export interface IParseRecurrenceRuleOptions {
    readonly recurrenceEndAt?: null | string;
    /** Converts date-only ends to the inclusive local end instant. Timed ends retain their instant. */
    readonly endDateMode?: 'calendar-day' | 'instant';
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

/**
 * Serializes the editable recurrence. Applications that store the end separately can keep the
 * default behavior. Set `includeUntil` for a self-contained RFC 5545 rule.
 */
export function createRecurrenceRule(value: IRecurrenceValue, options: { readonly includeUntil?: boolean } = {}): null | string {
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

    const time = recurrenceTime(value.recurrenceTime);
    if (time) {
        ruleParts.push(`BYHOUR=${time.hours}`, `BYMINUTE=${time.minutes}`);
    }
    if (value.recurrenceEndMode === 'COUNT') {
        ruleParts.push(`COUNT=${toPositiveInteger(value.recurrenceCount)}`);
    } else if (value.recurrenceEndMode === 'UNTIL' && options.includeUntil) {
        const until = formatUntil(value.recurrenceEndAt);
        if (until) {
            ruleParts.push(`UNTIL=${until}`);
        }
    }

    return ruleParts.join(';');
}

export function parseRecurrenceRule(value: null | string | undefined, options: IParseRecurrenceRuleOptions = {}): IRecurrenceValue {
    if (!value) {
        return { ...RECURRENCE_DEFAULT_VALUE };
    }

    const parts = new Map<string, string>();
    for (const part of value
        .trim()
        .replace(/^RRULE:/iu, '')
        .split(';')) {
        const separator = part.indexOf('=');
        if (separator > 0) {
            parts.set(part.slice(0, separator).trim().toUpperCase(), part.slice(separator + 1).trim());
        }
    }
    const frequency = parts.get('FREQ');
    if (frequency !== 'DAILY' && frequency !== 'WEEKLY' && frequency !== 'MONTHLY' && frequency !== 'YEARLY') {
        return { ...RECURRENCE_DEFAULT_VALUE };
    }
    const byDay = parts.get('BYDAY');
    const byMonthDay = /^-?\d+/u.exec(parts.get('BYMONTHDAY') ?? '')?.[0];
    const count = /^\d+$/u.exec(parts.get('COUNT') ?? '')?.[0];
    const rawUntil = parseUntil(parts.get('UNTIL')) ?? options.recurrenceEndAt ?? '';
    const until = options.endDateMode === 'calendar-day' ? toCalendarDayEndInstant(rawUntil) : rawUntil;
    const hour = parts.get('BYHOUR');
    const minutes = parts.get('BYMINUTE') ?? '0';
    const time = hour === undefined ? undefined : `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    const base: IRecurrenceValue = {
        ...RECURRENCE_DEFAULT_VALUE,
        recurrenceCount: count ?? RECURRENCE_DEFAULT_VALUE.recurrenceCount,
        recurrenceEndMode: count !== undefined ? 'COUNT' : until ? 'UNTIL' : 'NEVER',
        recurrenceEndAt: count === undefined ? until : '',
        recurrenceFrequency: frequency,
        recurrenceInterval: /^\d+$/u.exec(parts.get('INTERVAL') ?? '')?.[0] ?? RECURRENCE_DEFAULT_VALUE.recurrenceInterval,
        ...(recurrenceTime(time) ? { recurrenceTime: time } : {}),
    };

    if (frequency === 'WEEKLY' && byDay) {
        return { ...base, recurrenceByDays: normalizeRecurrenceByDays(byDay).join(',') };
    }

    if (frequency === 'MONTHLY' && byDay) {
        const weekdayMatch = /^(-?\d)?(MO|TU|WE|TH|FR|SA|SU)$/u.exec(byDay.split(',')[0]?.trim() ?? '');

        if (weekdayMatch) {
            return {
                ...base,
                recurrenceMonthlyMode: 'WEEKDAY_OF_MONTH',
                recurrenceWeekday: weekdayMatch[2] as RecurrenceWeekday,
                recurrenceWeekdayOrdinal: weekdayMatch[1] ?? RECURRENCE_DEFAULT_VALUE.recurrenceWeekdayOrdinal,
            };
        }
    }

    return {
        ...base,
        recurrenceMonthDay: byMonthDay ?? RECURRENCE_DEFAULT_VALUE.recurrenceMonthDay,
    };
}

export function normalizeRecurrenceByDays(value: string): ReadonlyArray<RecurrenceWeekday> {
    const entries = new Set(value.split(',').map((entry) => entry.trim().toUpperCase()));
    const values = RECURRENCE_WEEKDAY_OPTIONS.map((option) => option.value).filter((weekday) => entries.has(weekday));

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

function toCalendarDayEndInstant(value: string): string {
    if (/^\d{4}-\d{2}-\d{2}$/u.test(value)) {
        const day = fromCalendarDate(value);
        return day ? toCalendarDayEnd(day).toISOString() : '';
    }

    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : '';
}

function formatUntil(value: string): string | undefined {
    if (!fromCalendarDate(value)) {
        return undefined;
    }
    if (/^\d{4}-\d{2}-\d{2}$/u.test(value)) {
        return value.replaceAll('-', '');
    }
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp)
        ? new Date(timestamp)
              .toISOString()
              .replace(/[-:]/gu, '')
              .replace(/\.\d{3}Z$/u, 'Z')
        : undefined;
}

function parseUntil(value: string | undefined): string | undefined {
    const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})Z)?$/u.exec(value ?? '');
    if (!match) {
        return undefined;
    }
    const date = `${match[1]}-${match[2]}-${match[3]}`;
    if (!fromCalendarDate(date)) {
        return undefined;
    }
    const [, , , , hours, minutes, seconds] = match;
    if (hours === undefined) {
        return date;
    }
    return recurrenceTime(`${hours}:${minutes}`) && Number(seconds) <= 59 ? `${date}T${hours}:${minutes}:${seconds}Z` : undefined;
}
