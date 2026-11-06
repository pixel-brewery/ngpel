import { describe, expect, it } from 'vitest';
import { stringCodec } from './stringCodec';

describe('stringCodec', () => {
    it('parses text unchanged, including surrounding whitespace', () => {
        // Arrange
        const serializedValue = '  hello ';

        // Act
        const value = stringCodec.parse(serializedValue);

        // Assert
        expect(value).toBe('  hello ');
    });

    it('has no rejection path and parses the empty string instead of returning undefined', () => {
        // Arrange
        const serializedValue = '';

        // Act
        const value = stringCodec.parse(serializedValue);

        // Assert
        expect(value).not.toBeUndefined();
        expect(value).toBe('');
    });

    it('serializes text unchanged, including the empty string', () => {
        // Arrange
        const value = '';

        // Act
        const serializedValue = stringCodec.serialize(value);

        // Assert
        expect(serializedValue).toBe('');
        expect(Object.isFrozen(stringCodec)).toBe(true);
    });
});
