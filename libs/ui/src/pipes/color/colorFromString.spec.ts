// #region Imports

import { describe, expect, it } from 'vitest';
import { colorFromString } from './colorFromString';

// #endregion

describe('colorFromString', () => {
    it.each<[string, string]>([
        ['ada', '#3ed0a7'],
        ['ada lovelace', '#9a33d7'],
        ['platform', '#b6d945'],
        ['support', '#934bd2'],
        ['', '#d6d930'],
    ])('derives %j as %s', (value, expected) => {
        // Arrange

        // Act
        const result = colorFromString(value);

        // Assert
        expect(result).toBe(expected);
    });

    it('derives the same colour for the same text', () => {
        // Arrange
        const first = colorFromString('ada lovelace');

        // Act
        const second = colorFromString('ada lovelace');

        // Assert
        expect(second).toBe(first);
    });

    it('derives a different colour for different text', () => {
        // Arrange
        const first = colorFromString('ada');

        // Act
        const second = colorFromString('ida');

        // Assert
        expect(second).not.toBe(first);
    });
});
