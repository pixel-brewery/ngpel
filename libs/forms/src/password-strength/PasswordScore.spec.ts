import { describe, expect, it } from 'vitest';
import { PasswordScore } from './PasswordScore';

describe('PasswordScore', () => {
    it('orders the levels from Blank to VeryStrong', () => {
        // Arrange
        const levels = ['Blank', 'VeryWeak', 'Weak', 'Medium', 'Strong', 'VeryStrong'] as const;

        // Act
        const ordinals = levels.map((level) => PasswordScore[level]);

        // Assert
        expect(ordinals).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it('declares no level beyond the six documented ones', () => {
        // Arrange
        const expected = ['Blank', 'Medium', 'Strong', 'VeryStrong', 'VeryWeak', 'Weak'];

        // Act
        const declared = Object.keys(PasswordScore).sort();

        // Assert
        expect(declared).toEqual(expected);
    });
});
