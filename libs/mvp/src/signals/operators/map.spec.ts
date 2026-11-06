// #region Imports

import { describe, expect, it } from 'vitest';
import { SignalSubject } from '../SignalSubject';
import { map } from './map';

// #endregion

describe('signal map', () => {
    it('projects the current value while constructing the output', () => {
        // Arrange
        const source = new SignalSubject(3);

        // Act
        const result = map((value: number): string => String(value))(source);

        // Assert
        expect(result.value).toBe('3');
    });

    it('keeps the output empty until an uninitialized source emits', () => {
        // Arrange
        const source = new SignalSubject<number>();

        // Act
        const result = map((value: number): number => value * 2)(source);

        // Assert
        expect(result.value).toBeUndefined();
    });
});
