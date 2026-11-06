// #region Imports

import { afterEach, describe, expect, it, vi } from 'vitest';
import { fromCalendarDate } from './fromCalendarDate';
import { normalizeCalendarDate } from './normalizeCalendarDate';
import { toCalendarDate } from './toCalendarDate';

// #endregion

describe('calendar date transport', () => {
    afterEach(() => vi.unstubAllEnvs());

    it.each(['Asia/Tokyo', 'Europe/Berlin', 'America/New_York'])('formats the selected local day in %s', (timeZone) => {
        // Arrange
        vi.stubEnv('TZ', timeZone);
        const chosenDate = new Date(2026, 8, 15);

        // Act
        const result = toCalendarDate(chosenDate);

        // Assert
        expect(result).toBe('2026-09-15');
    });

    it.each(['Asia/Tokyo', 'America/New_York'])('decodes a stored UTC midnight to the same local day in %s', (timeZone) => {
        // Arrange
        vi.stubEnv('TZ', timeZone);

        // Act
        const result = fromCalendarDate('2026-09-15T00:00:00.000Z');

        // Assert
        expect(result).toEqual(new Date(2026, 8, 15));
    });

    it('normalizes legacy local midnight east of UTC', () => {
        // Arrange
        vi.stubEnv('TZ', 'Europe/Berlin');

        // Act
        const result = normalizeCalendarDate('2026-09-14T22:00:00.000Z');

        // Assert
        expect(result).toBe('2026-09-15');
    });

    it('preserves a leap day for a year below one hundred', () => {
        // Act
        const result = fromCalendarDate('0096-02-29');

        // Assert
        expect(result && toCalendarDate(result)).toBe('0096-02-29');
    });

    it.each([null, '', '2026-02-30', '1900-02-29', 'tomorrow'])('rejects the invalid calendar input %s', (value) => {
        // Act
        const result = fromCalendarDate(value);

        // Assert
        expect(result).toBeNull();
    });
});
