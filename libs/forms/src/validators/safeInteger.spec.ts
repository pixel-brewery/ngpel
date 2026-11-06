import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { safeInteger } from './safeInteger';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('safeInteger', () => {
    it('accepts safe integers and a missing value', () => {
        // Arrange
        const candidates: ReadonlyArray<number | null> = [0, -42, Number.MAX_SAFE_INTEGER, null];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors<number | null>(candidate, (path) => safeInteger(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a fractional number', () => {
        // Arrange
        const value = 1.5;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => safeInteger(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'safeInteger', actualValue: 1.5 })]);
    });

    it('rejects an integer beyond the safe range', () => {
        // Arrange
        const value = Number.MAX_SAFE_INTEGER + 2;

        // Act
        const errors = collectFieldErrors<number | null>(value, (path) => safeInteger(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'safeInteger', actualValue: Number.MAX_SAFE_INTEGER + 2 })]);
    });
});
