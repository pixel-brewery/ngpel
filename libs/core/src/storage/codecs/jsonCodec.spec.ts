import { describe, expect, it } from 'vitest';
import { jsonCodec } from './jsonCodec';

interface IPoint {
    readonly x: number;
    readonly y: number;
}

function isPoint(candidate: unknown): candidate is IPoint {
    return (
        typeof candidate === 'object' &&
        candidate !== null &&
        'x' in candidate &&
        'y' in candidate &&
        typeof candidate.x === 'number' &&
        typeof candidate.y === 'number'
    );
}

describe('jsonCodec', () => {
    it('parses valid JSON that passes the guard', () => {
        // Arrange
        const codec = jsonCodec(isPoint);

        // Act
        const value = codec.parse('{"x":1,"y":2}');

        // Assert
        expect(value).toEqual({ x: 1, y: 2 });
    });

    it('parses malformed JSON as undefined instead of throwing', () => {
        // Arrange
        const codec = jsonCodec(isPoint);

        // Act
        const value = codec.parse('{"x":1,');

        // Assert
        expect(value).toBeUndefined();
    });

    it('parses valid JSON that fails the guard as undefined', () => {
        // Arrange
        const codec = jsonCodec(isPoint);

        // Act
        const values = [codec.parse('{"x":"1","y":2}'), codec.parse('null'), codec.parse('[1,2]')];

        // Assert
        expect(values).toEqual([undefined, undefined, undefined]);
    });

    it('serializes a valid value as JSON', () => {
        // Arrange
        const codec = jsonCodec(isPoint);

        // Act
        const serializedValue = codec.serialize({ x: 3, y: 4 });

        // Assert
        expect(serializedValue).toBe('{"x":3,"y":4}');
    });

    it('refuses to serialize a value that fails the guard', () => {
        // Arrange
        const codec = jsonCodec(isPoint);
        const value = { x: Number('nope'), y: 'y' } as unknown as IPoint;

        // Act
        const serialize = (): string => codec.serialize(value);

        // Assert
        expect(serialize).toThrow(TypeError);
        expect(serialize).toThrow('Attempted to persist an invalid structured value.');
    });
});
