// #region Imports

import { describe, expect, it } from 'vitest';
import { getContrastingTextColor } from './getContrastingTextColor';

// #endregion

describe('getContrastingTextColor', () => {
    it.each<[string, string]>([
        ['#ffffff', '#000000'],
        ['#000000', '#ffffff'],
        ['#d6d930', '#000000'],
        ['#9a33d7', '#ffffff'],
        ['fff', '#000000'],
        ['  #000  ', '#ffffff'],
    ])('reads %j as %s', (background, expected) => {
        // Arrange

        // Act
        const result = getContrastingTextColor(background);

        // Assert
        expect(result).toBe(expected);
    });

    it.each(['', 'rebeccapurple', '#12345', '#gggggg'])('falls back to black for the unparsable background %j', (background) => {
        // Arrange

        // Act
        const result = getContrastingTextColor(background);

        // Assert
        expect(result).toBe('#000000');
    });
});
