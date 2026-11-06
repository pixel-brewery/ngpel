import { describe, expect, it } from 'vitest';
import { positiveIntegerCodec } from './positiveIntegerCodec';

describe('positiveIntegerCodec', () => {
    it('parses a canonical positive integer', () => {
        // Arrange
        const serializedValue = '4711';

        // Act
        const value = positiveIntegerCodec.parse(serializedValue);

        // Assert
        expect(value).toBe(4711);
    });

    it('rejects zero, negatives, fractions, leading zeros, text and unsafe magnitudes', () => {
        // Arrange
        const serializedValues = ['0', '-1', '1.5', '01', 'abc', '', '9007199254740993'];

        // Act
        const values = serializedValues.map((serializedValue) => positiveIntegerCodec.parse(serializedValue));

        // Assert
        expect(values).toEqual([undefined, undefined, undefined, undefined, undefined, undefined, undefined]);
    });

    it('serializes a positive safe integer', () => {
        // Arrange
        const value = 7;

        // Act
        const serializedValue = positiveIntegerCodec.serialize(value);

        // Assert
        expect(serializedValue).toBe('7');
    });

    it('refuses to serialize zero, negatives and fractions', () => {
        // Arrange
        const values = [0, -3, 1.5, Number.NaN];

        // Act
        const serializers = values.map((value) => (): string => positiveIntegerCodec.serialize(value));

        // Assert
        for (const serialize of serializers) {
            expect(serialize).toThrow(TypeError);
        }
        expect(serializers[0]).toThrow('Expected a positive safe integer, received "0".');
    });
});
