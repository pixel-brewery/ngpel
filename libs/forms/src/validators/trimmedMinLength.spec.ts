import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { trimmedMinLength } from './trimmedMinLength';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('trimmedMinLength', () => {
    it('accepts text whose trimmed length reaches the minimum, plus empty text', () => {
        // Arrange
        const candidates = ['Ada', '   Ada   ', 'Lovelace', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => trimmedMinLength(path, 3)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects text that is only long enough before trimming, under the minLength error kind', () => {
        // Arrange
        const value = '  ab  ';

        // Act
        const errors = collectFieldErrors(value, (path) => trimmedMinLength(path, 3));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'minLength', actualValue: '  ab  ', minLength: 3 })]);
    });

    it('rejects whitespace-only text', () => {
        // Arrange
        const value = '     ';

        // Act
        const errors = collectFieldErrors(value, (path) => trimmedMinLength(path, 3));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'minLength', actualValue: '     ' })]);
    });
});
