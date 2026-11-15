// #region Imports

import { afterEach, describe, expect, it } from 'vitest';
import { endOfLocalDay } from './endOfLocalDay';
import { startOfLocalDay } from './startOfLocalDay';
import { toLocalInstant } from './toLocalInstant';

// #endregion

describe('local day boundaries', () => {
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
        ['Europe/Berlin', '2026-09-15T00:00:00.000+02:00', '2026-09-15T23:59:59.999+02:00'],
    ])('covers the chosen day in %s', (timeZone, expectedStart, expectedEnd) => {
        // arrange
        process.env['TZ'] = timeZone;

        // act
        const start = startOfLocalDay('2026-09-15');
        const end = endOfLocalDay(new Date(2026, 8, 15, 14, 30));

        // assert
        expect(start).toBe(expectedStart);
        expect(end).toBe(expectedEnd);
    });

    it('ends the day on which daylight saving time ends in Berlin with the winter offset', () => {
        // arrange
        process.env['TZ'] = 'Europe/Berlin';

        // act
        const start = startOfLocalDay('2026-10-25');
        const end = endOfLocalDay('2026-10-25');

        // assert
        expect(start).toBe('2026-10-25T00:00:00.000+02:00');
        expect(end).toBe('2026-10-25T23:59:59.999+01:00');
    });

    it('names the same instant as its UTC form', () => {
        // arrange
        process.env['TZ'] = 'Asia/Tokyo';
        const instant = new Date('2026-09-15T01:30:00.250Z');

        // act
        const result = toLocalInstant(instant);

        // assert
        expect(result).toBe('2026-09-15T10:30:00.250+09:00');
        expect(new Date(result ?? '').getTime()).toBe(instant.getTime());
    });

    it.each([
        ['a date-time instead of a day', '2026-09-15T00:00:00Z'],
        ['an impossible day', '2026-02-30'],
        ['an invalid date', new Date(Number.NaN)],
    ])('does not resolve %s', (_description, value) => {
        // act
        const result = startOfLocalDay(value);

        // assert
        expect(result).toBeUndefined();
    });
});
