import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { dateAfter } from './dateAfter';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('dateAfter', () => {
    it('accepts an instant strictly after the bound', () => {
        // Arrange
        const minimum = new Date(2024, 0, 15, 12, 0);

        // Act
        const errors = collectFieldErrors<Date | null>(new Date(2024, 0, 15, 12, 1), (path) => dateAfter(path, minimum));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects an instant equal to the bound because the bound is exclusive', () => {
        // Arrange
        const minimum = new Date(2024, 0, 15, 12, 0);
        const value = new Date(2024, 0, 15, 12, 0);

        // Act
        const errors = collectFieldErrors<Date | null>(value, (path) => dateAfter(path, minimum));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'dateAfter', actualValue: value, minimum })]);
    });

    it('accepts a missing value and a missing bound', () => {
        // Arrange
        const minimum = new Date(2024, 0, 15);

        // Act
        const errors = [
            ...collectFieldErrors<Date | null>(null, (path) => dateAfter(path, minimum)),
            ...collectFieldErrors<Date | null>(new Date(2020, 0, 1), (path) => dateAfter(path, null)),
        ];

        // Assert
        expect(errors).toEqual([]);
    });

    it('accepts an invalid date and leaves it to validDate', () => {
        // Arrange
        const minimum = new Date(2024, 0, 15);

        // Act
        const errors = collectFieldErrors<Date | null>(new Date('not a date'), (path) => dateAfter(path, minimum));

        // Assert
        expect(errors).toEqual([]);
    });
});
