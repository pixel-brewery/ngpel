import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { safeScaledInteger } from './safeScaledInteger';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('safeScaledInteger', () => {
    it('accepts values that stay safe once scaled, and a missing value', () => {
        // Arrange
        const candidates: ReadonlyArray<number | null> = [19.99, -0.01, 0, null];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors<number | null>(candidate, (path) => safeScaledInteger(path, 100)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a value that leaves the safe range once scaled and reports the factor', () => {
        // Arrange
        const value = Number.MAX_SAFE_INTEGER;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => safeScaledInteger(path, 100));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'safeScaledInteger', actualValue: Number.MAX_SAFE_INTEGER, factor: 100 })]);
    });

    it('rejects a non-finite value', () => {
        // Arrange
        const value = Number.POSITIVE_INFINITY;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => safeScaledInteger(path, 100));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'safeScaledInteger' })]);
    });

    it('refuses a scale factor that is not a positive safe integer', () => {
        // Arrange
        const factor = 0;

        // Act
        const register = (): ReadonlyArray<unknown> => collectFieldErrors<number | null>(1, (path) => safeScaledInteger(path, factor));

        // Assert
        expect(register).toThrow(RangeError);
    });
});
