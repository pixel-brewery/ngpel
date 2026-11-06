import { describe, expect, it } from 'vitest';
import { JsonUserPreferenceCodec } from './JsonUserPreferenceCodec';

interface IColumnPreference {
    readonly hidden: ReadonlyArray<string>;
}

function isColumnPreference(value: unknown): value is IColumnPreference {
    return typeof value === 'object' && value !== null && 'hidden' in value && Array.isArray(value.hidden);
}

describe('JsonUserPreferenceCodec', () => {
    it('returns a payload that passes the guard', () => {
        // Arrange
        const codec = new JsonUserPreferenceCodec(isColumnPreference);
        const payload: unknown = { hidden: ['id'] };

        // Act
        const value = codec.parse(payload);

        // Assert
        expect(value).toEqual({ hidden: ['id'] });
    });

    it('returns undefined for a payload that fails the guard', () => {
        // Arrange
        const codec = new JsonUserPreferenceCodec(isColumnPreference);

        // Act
        const values = [codec.parse({ hidden: 'id' }), codec.parse(null), codec.parse('x')];

        // Assert
        expect(values).toEqual([undefined, undefined, undefined]);
    });

    it('serializes the value unchanged', () => {
        // Arrange
        const codec = new JsonUserPreferenceCodec(isColumnPreference);
        const value: IColumnPreference = { hidden: [] };

        // Act
        const serializedValue = codec.serialize(value);

        // Assert
        expect(serializedValue).toBe(value);
    });
});
