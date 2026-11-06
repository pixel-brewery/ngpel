import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { hostname } from './hostname';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('hostname', () => {
    it('accepts multi-label names with inner hyphens and empty text', () => {
        // Arrange
        const candidates = ['example.com', 'my-service.internal.example.org', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => hostname(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a single-label name such as localhost', () => {
        // Arrange
        const value = 'localhost';

        // Act
        const errors = collectFieldErrors(value, (path) => hostname(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'hostname', actualValue: 'localhost' })]);
    });

    it('rejects a label starting with a hyphen', () => {
        // Arrange
        const value = '-service.example.com';

        // Act
        const errors = collectFieldErrors(value, (path) => hostname(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'hostname', actualValue: '-service.example.com' })]);
    });
});
