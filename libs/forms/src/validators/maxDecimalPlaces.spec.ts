import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { maxDecimalPlaces } from './maxDecimalPlaces';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('maxDecimalPlaces', () => {
    it('accepts numbers within the allowed precision and a missing value', () => {
        // Arrange
        const candidates: ReadonlyArray<number | null> = [12, 12.3, 12.34, null];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors<number | null>(candidate, (path) => maxDecimalPlaces(path, 2)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a number with too many decimal places and reports the limit', () => {
        // Arrange
        const value = 12.345;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => maxDecimalPlaces(path, 2));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'maxDecimalPlaces', actualValue: 12.345, maxDecimalPlaces: 2 })]);
    });

    it('accepts a non-finite number and leaves it to finite', () => {
        // Arrange
        const value = Number.POSITIVE_INFINITY;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => maxDecimalPlaces(path, 2));

        // Assert
        expect(errors).toEqual([]);
    });
});
