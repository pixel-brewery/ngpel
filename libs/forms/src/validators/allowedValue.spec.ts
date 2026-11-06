import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { allowedValue } from './allowedValue';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('allowedValue', () => {
    it('accepts a value contained in the allowed set', () => {
        // Arrange
        const allowed = ['draft', 'published'];

        // Act
        const errors = collectFieldErrors('published', (path) => allowedValue(path, allowed));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a value outside the allowed set and reports both the value and the set', () => {
        // Arrange
        const allowed = ['draft', 'published'];

        // Act
        const errors = collectFieldErrors('archived', (path) => allowedValue(path, allowed));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'allowedValue', actualValue: 'archived', allowedValues: allowed })]);
    });

    it('skips the check while the activation condition fails', () => {
        // Arrange
        const allowed = ['draft'];

        // Act
        const errors = collectFieldErrors('archived', (path) => allowedValue(path, allowed, { when: () => false }));

        // Assert
        expect(errors).toEqual([]);
    });

    it('reports the configured custom error instead of the default one', () => {
        // Arrange
        const allowed = ['draft'];

        // Act
        const errors = collectFieldErrors('archived', (path) => allowedValue(path, allowed, { error: { kind: 'unknownStatus' } }));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'unknownStatus' })]);
    });
});
