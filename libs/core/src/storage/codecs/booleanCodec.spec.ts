import { describe, expect, it } from 'vitest';
import { booleanCodec } from './booleanCodec';

describe('booleanCodec', () => {
    it('parses "true" as boolean true', () => {
        // Arrange
        const codec = booleanCodec();

        // Act
        const value = codec.parse('true');

        // Assert
        expect(value).toBe(true);
    });

    it('parses "false" as boolean false', () => {
        // Arrange
        const codec = booleanCodec();

        // Act
        const value = codec.parse('false');

        // Assert
        expect(value).toBe(false);
    });

    it('returns undefined for unknown and empty values', () => {
        // Arrange
        const codec = booleanCodec();

        // Act
        const values = [codec.parse('unknown'), codec.parse(''), codec.parse('TRUE')];

        // Assert
        expect(values).toEqual([undefined, undefined, undefined]);
    });

    it('serializes true as "true" and false as "false"', () => {
        // Arrange
        const codec = booleanCodec();

        // Act
        const serializedValues = [codec.serialize(true), codec.serialize(false)];

        // Assert
        expect(serializedValues).toEqual(['true', 'false']);
    });

    it('honors custom textual representations in both directions', () => {
        // Arrange
        const codec = booleanCodec('1', '0');

        // Act
        const roundTrip = [codec.parse('1'), codec.parse('0'), codec.parse('true'), codec.serialize(true), codec.serialize(false)];

        // Assert
        expect(roundTrip).toEqual([true, false, undefined, '1', '0']);
        expect(Object.isFrozen(codec)).toBe(true);
    });
});
