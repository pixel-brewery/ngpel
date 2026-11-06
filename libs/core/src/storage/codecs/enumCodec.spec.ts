import { describe, expect, it } from 'vitest';
import { enumCodec } from './enumCodec';

describe('enumCodec', () => {
    it('parses an allowed value with its literal type', () => {
        // Arrange
        const codec = enumCodec(['table', 'gallery']);

        // Act
        const value = codec.parse('gallery');

        // Assert
        expect(value).toBe('gallery');
    });

    it('parses a value outside the union as undefined', () => {
        // Arrange
        const codec = enumCodec(['table', 'gallery']);

        // Act
        const values = [codec.parse('list'), codec.parse(''), codec.parse('Table')];

        // Assert
        expect(values).toEqual([undefined, undefined, undefined]);
    });

    it('serializes an allowed value unchanged', () => {
        // Arrange
        const codec = enumCodec(['light', 'dark', 'system']);

        // Act
        const serializedValue = codec.serialize('system');

        // Assert
        expect(serializedValue).toBe('system');
    });

    it('refuses to serialize a value outside the union', () => {
        // Arrange
        const codec = enumCodec(['light', 'dark']);
        const value = 'sepia' as 'light';

        // Act
        const serialize = (): string => codec.serialize(value);

        // Assert
        expect(serialize).toThrow(TypeError);
        expect(serialize).toThrow('Unsupported enum value "sepia".');
    });
});
