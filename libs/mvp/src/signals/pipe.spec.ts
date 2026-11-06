// #region Imports

import { describe, expect, it } from 'vitest';
import { SignalSubject } from './SignalSubject';
import { map } from './operators/map';
import { pipe } from './pipe';

// #endregion

describe('signal pipe', () => {
    it('returns the source when no operators are supplied', () => {
        // Arrange
        const source = new SignalSubject(3);

        // Act
        const result = pipe<number, number>(source);

        // Assert
        expect(result).toBe(source);
    });

    it('composes projections across different value types in order', () => {
        // Arrange
        const source = new SignalSubject<number>();
        const result = pipe<number, string>(
            source,
            map((value: number): number => value * 2),
            map((value: number): string => `Result: ${value}`),
        );

        // Act
        source.next(3);

        // Assert
        expect(result.value).toBe('Result: 6');
        expect(source.value).toBe(3);
    });
});
