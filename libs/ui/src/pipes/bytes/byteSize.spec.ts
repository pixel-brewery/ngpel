// #region Imports

import { describe, expect, it } from 'vitest';
import { byteSize } from './byteSize';

// #endregion

describe('byteSize', () => {
    it.each<[number, string]>([
        [0, '0 B'],
        [512, '512 B'],
        [1024, '1.0 KB'],
        [1536, '1.5 KB'],
        [15_360, '15 KB'],
        [52_428_800, '50 MB'],
        [3_221_225_472, '3.0 GB'],
        [2_199_023_255_552, '2.0 TB'],
    ])('formats %i bytes as %s', (value, expected) => {
        // Arrange

        // Act
        const result = byteSize(value);

        // Assert
        expect(result).toBe(expected);
    });

    it('keeps the largest unit for sizes beyond it', () => {
        // Arrange
        const petabyte = 1024 ** 5;

        // Act
        const result = byteSize(petabyte);

        // Assert
        expect(result).toBe('1024 TB');
    });

    it('renders a negative size as zero', () => {
        // Arrange

        // Act
        const result = byteSize(-1);

        // Assert
        expect(result).toBe('0 B');
    });

    it.each([null, undefined, Number.NaN, Number.POSITIVE_INFINITY])('renders the fallback for %j', (value) => {
        // Arrange

        // Act
        const result = byteSize(value);

        // Assert
        expect(result).toBe('0 B');
    });

    it('renders the given fallback for an unknown size', () => {
        // Arrange

        // Act
        const result = byteSize(undefined, 'measuring…');

        // Assert
        expect(result).toBe('measuring…');
    });
});
