import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { singleLine } from './singleLine';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('singleLine', () => {
    it('accepts text without control characters, including a non-breaking space, plus empty text', () => {
        // Arrange
        const candidates = ['Ada Lovelace', 'Ada\u00A0Lovelace', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => singleLine(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects text containing a line break', () => {
        // Arrange
        const value = 'Ada\nLovelace';

        // Act
        const errors = collectFieldErrors(value, (path) => singleLine(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'singleLine', actualValue: 'Ada\nLovelace' })]);
    });

    it('rejects text containing a Unicode line separator', () => {
        // Arrange
        const value = 'Ada\u2028Lovelace';

        // Act
        const errors = collectFieldErrors(value, (path) => singleLine(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'singleLine', actualValue: 'Ada\u2028Lovelace' })]);
    });
});
