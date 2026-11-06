import { describe, expect, it } from 'vitest';
import { isLanguageRegionCode } from './isLanguageRegionCode';

describe('isLanguageRegionCode', () => {
    it('accepts normalized codes, ignoring surrounding whitespace', () => {
        // Arrange
        const candidates = ['de-DE', 'en-US', '  fr-CH  '];

        // Act
        const results = candidates.map((candidate) => isLanguageRegionCode(candidate));

        // Assert
        expect(results).toEqual([true, true, true]);
    });

    it('rejects unnormalized casing, wrong separators and bare language tags', () => {
        // Arrange
        const candidates = ['de-de', 'DE-DE', 'de_DE', 'de', ''];

        // Act
        const results = candidates.map((candidate) => isLanguageRegionCode(candidate));

        // Assert
        expect(results).toEqual([false, false, false, false, false]);
    });
});
