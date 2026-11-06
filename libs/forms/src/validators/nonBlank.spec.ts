import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { nonBlank } from './nonBlank';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('nonBlank', () => {
    it('accepts text containing at least one non-whitespace character', () => {
        // Arrange
        const candidates = ['Ada', '  Ada  ', '.'];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => nonBlank(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects whitespace-only text under the required error kind', () => {
        // Arrange
        const value = '   ';

        // Act
        const errors = collectFieldErrors(value, (path) => nonBlank(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'required', actualValue: '   ' })]);
    });

    it('rejects empty text, unlike the other text validators', () => {
        // Arrange
        const value = '';

        // Act
        const errors = collectFieldErrors(value, (path) => nonBlank(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'required', actualValue: '' })]);
    });
});
