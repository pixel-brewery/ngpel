import { describe, expect, it } from 'vitest';
import { nonNegativeIntegerCodec } from './nonNegativeIntegerCodec';

describe('nonNegativeIntegerCodec', () => {
    it('parses zero and positive integers', () => {
        // Arrange
        const serializedValues = ['0', '12'];

        // Act
        const values = serializedValues.map((serializedValue) => nonNegativeIntegerCodec.parse(serializedValue));

        // Assert
        expect(values).toEqual([0, 12]);
    });

    it('rejects negatives, fractions, leading zeros, text and unsafe magnitudes', () => {
        // Arrange
        const serializedValues = ['-1', '2.5', '007', 'x', '', '9007199254740993'];

        // Act
        const values = serializedValues.map((serializedValue) => nonNegativeIntegerCodec.parse(serializedValue));

        // Assert
        expect(values).toEqual([undefined, undefined, undefined, undefined, undefined, undefined]);
    });

    it('serializes zero', () => {
        // Arrange
        const value = 0;

        // Act
        const serializedValue = nonNegativeIntegerCodec.serialize(value);

        // Assert
        expect(serializedValue).toBe('0');
    });

    it('refuses to serialize negatives and fractions', () => {
        // Arrange
        const values = [-1, 0.5];

        // Act
        const serializers = values.map((value) => (): string => nonNegativeIntegerCodec.serialize(value));

        // Assert
        expect(serializers[0]).toThrow('Expected a non-negative safe integer, received "-1".');
        expect(serializers[1]).toThrow(TypeError);
    });
});
