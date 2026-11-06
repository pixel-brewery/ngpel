import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { port } from './port';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('port', () => {
    it('accepts the boundaries of the port range and empty text', () => {
        // Arrange
        const candidates = ['1', '8080', '65535', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => port(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects port zero', () => {
        // Arrange
        const value = '0';

        // Act
        const errors = collectFieldErrors(value, (path) => port(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'port', actualValue: '0' })]);
    });

    it('rejects a port above the range', () => {
        // Arrange
        const value = '65536';

        // Act
        const errors = collectFieldErrors(value, (path) => port(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'port', actualValue: '65536' })]);
    });

    it.each(['http', '1.5', ' '])('rejects port text without a whole number: %j', (value) => {
        // Act
        const errors = collectFieldErrors(value, (path) => port(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'port', actualValue: value })]);
    });
});
