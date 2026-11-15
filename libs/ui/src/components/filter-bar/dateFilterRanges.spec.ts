// #region Imports

import { afterEach, describe, expect, it } from 'vitest';
import { getCalendarDateFilterRange } from './getCalendarDateFilterRange';
import { getLocalDayFilterRange } from './getLocalDayFilterRange';
import { FilterBarMode, FilterCondition, FilterOperator } from './IFilterDefinition';

// #endregion

describe('day filters', () => {
    const originalTimeZone = process.env['TZ'];

    afterEach(() => {
        if (originalTimeZone === undefined) {
            delete process.env['TZ'];
        } else {
            process.env['TZ'] = originalTimeZone;
        }
    });

    it.each([
        ['America/New_York', '2026-09-15T00:00:00.000-04:00', '2026-09-15T23:59:59.999-04:00'],
        ['Asia/Tokyo', '2026-09-15T00:00:00.000+09:00', '2026-09-15T23:59:59.999+09:00'],
    ])('limit a point-in-time field to the chosen local day in %s', (timeZone, expectedFrom, expectedTo) => {
        // arrange
        process.env['TZ'] = timeZone;
        const chosenDay = new Date(2026, 8, 15);

        // act
        const range = getLocalDayFilterRange({ createdAt: chosenDay }, 'createdAt');

        // assert
        expect(range).toEqual({ from: expectedFrom, to: expectedTo });
    });

    it.each(['America/New_York', 'Asia/Tokyo'])('limit a calendar-day field to the chosen day without shifting it in %s', (timeZone) => {
        // arrange
        process.env['TZ'] = timeZone;
        const chosenDay = new Date(2026, 8, 15);

        // act
        const range = getCalendarDateFilterRange({ dateOfBirth: chosenDay }, 'dateOfBirth');

        // assert
        expect(range).toEqual({ from: '2026-09-15', to: '2026-09-15' });
    });

    it.each([
        ['America/New_York', '2026-09-15', '2026-09-15T00:00:00.000-04:00'],
        ['America/New_York', '2026-09-15T04:00:00.000Z', '2026-09-15T00:00:00.000-04:00'],
        ['Asia/Tokyo', '2026-09-15', '2026-09-15T00:00:00.000+09:00'],
        ['Asia/Tokyo', '2026-09-14T15:00:00.000Z', '2026-09-15T00:00:00.000+09:00'],
    ])('read a restored day filter in %s given as %s as the chosen day', (timeZone, restored, expectedFrom) => {
        // arrange
        process.env['TZ'] = timeZone;

        // act
        const localDay = getLocalDayFilterRange({ createdAt: restored }, 'createdAt');
        const calendarDay = getCalendarDateFilterRange({ dateOfBirth: restored }, 'dateOfBirth');

        // assert
        expect(localDay.from).toBe(expectedFrom);
        expect(calendarDay).toEqual({ from: '2026-09-15', to: '2026-09-15' });
    });

    it('ignore an invalid day', () => {
        // act
        const localDay = getLocalDayFilterRange({ createdAt: 'not a date' }, 'createdAt');
        const calendarDay = getCalendarDateFilterRange({ dateOfBirth: 'not a date' }, 'dateOfBirth');

        // assert
        expect(localDay).toEqual({});
        expect(calendarDay).toEqual({});
    });

    it('uses the daylight-saving offsets at both ends of the day selected by an advanced rule', () => {
        process.env['TZ'] = 'Europe/Berlin';
        const filters = {
            mode: FilterBarMode.Advanced,
            root: {
                kind: 'group' as const,
                id: 'root',
                condition: FilterCondition.And,
                children: [
                    {
                        kind: 'rule' as const,
                        id: 'scheduled-day',
                        fieldKey: 'scheduledAt',
                        operator: FilterOperator.On,
                        value: '2026-10-25',
                    },
                ],
            },
        };

        const range = getLocalDayFilterRange(filters, 'scheduledAt');

        expect(range).toEqual({
            from: '2026-10-25T00:00:00.000+02:00',
            to: '2026-10-25T23:59:59.999+01:00',
        });
    });
});
