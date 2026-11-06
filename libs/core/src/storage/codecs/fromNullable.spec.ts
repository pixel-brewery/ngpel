import { describe, expect, it } from 'vitest';
import { fromNullable } from './fromNullable';
import { positiveIntegerCodec } from './positiveIntegerCodec';

describe('fromNullable', () => {
    it('parses null as undefined without consulting the inner codec', () => {
        // Arrange
        const codec = fromNullable(positiveIntegerCodec);

        // Act
        const value = codec.parse(null);

        // Assert
        expect(value).toBeUndefined();
    });

    it('delegates non-null values to the inner codec', () => {
        // Arrange
        const codec = fromNullable(positiveIntegerCodec);

        // Act
        const values = [codec.parse('42'), codec.parse('-1')];

        // Assert
        expect(values).toEqual([42, undefined]);
    });

    it('serializes through the inner codec, including its validation', () => {
        // Arrange
        const codec = fromNullable(positiveIntegerCodec);

        // Act
        const serializedValue = codec.serialize(9);

        // Assert
        expect(serializedValue).toBe('9');
        expect(() => codec.serialize(0)).toThrow(TypeError);
        expect(Object.isFrozen(codec)).toBe(true);
    });
});
