import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { validDate } from './validDate';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('validDate', () => {
    it('accepts a date carrying a valid timestamp and a missing value', () => {
        // Arrange
        const candidates: ReadonlyArray<Date | null> = [new Date(2024, 0, 15), null];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors<Date | null>(candidate, (path) => validDate(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a date parsed from unparsable text', () => {
        // Arrange
        const value = new Date('not a date');

        // Act
        const errors = collectFieldErrors<Date | null>(value, (path) => validDate(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'validDate', actualValue: value })]);
    });

    it('rejects a date built from an out-of-range timestamp', () => {
        // Arrange
        const value = new Date(Number.NaN);

        // Act
        const errors = collectFieldErrors<Date | null>(value, (path) => validDate(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'validDate' })]);
    });
});
