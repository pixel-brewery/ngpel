import { describe, expect, it } from 'vitest';
import { nonEmptyStringCodec } from './nonEmptyStringCodec';

describe('nonEmptyStringCodec', () => {
    it('parses trimmed text', () => {
        // Arrange
        const serializedValue = '  compact ';

        // Act
        const value = nonEmptyStringCodec.parse(serializedValue);

        // Assert
        expect(value).toBe('compact');
    });

    it('parses whitespace-only text as undefined', () => {
        // Arrange
        const serializedValue = ' \t ';

        // Act
        const value = nonEmptyStringCodec.parse(serializedValue);

        // Assert
        expect(value).toBeUndefined();
    });

    it('serializes trimmed text', () => {
        // Arrange
        const value = ' table ';

        // Act
        const serializedValue = nonEmptyStringCodec.serialize(value);

        // Assert
        expect(serializedValue).toBe('table');
    });

    it('refuses to serialize whitespace-only text', () => {
        // Arrange
        const value = '   ';

        // Act
        const serialize = (): string => nonEmptyStringCodec.serialize(value);

        // Assert
        expect(serialize).toThrow(TypeError);
        expect(serialize).toThrow('Expected a non-empty string value.');
    });
});
