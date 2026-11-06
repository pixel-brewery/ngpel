import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { finite } from './finite';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('finite', () => {
    it('accepts finite numbers and a missing value', () => {
        // Arrange
        const candidates: ReadonlyArray<number | null> = [0, -12.5, Number.MAX_SAFE_INTEGER, null];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors<number | null>(candidate, (path) => finite(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects infinity', () => {
        // Arrange
        const value = Number.POSITIVE_INFINITY;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => finite(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'finite', actualValue: Number.POSITIVE_INFINITY })]);
    });

    it('rejects NaN', () => {
        // Arrange
        const value = Number.NaN;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => finite(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'finite' })]);
    });
});
