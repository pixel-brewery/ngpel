import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { currencyCode } from './currencyCode';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('currencyCode', () => {
    it('accepts three-letter codes in either casing and empty text', () => {
        // Arrange
        const candidates = ['EUR', 'chf', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => currencyCode(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a code that is not exactly three letters', () => {
        // Arrange
        const value = 'EU';

        // Act
        const errors = collectFieldErrors(value, (path) => currencyCode(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'currencyCode', actualValue: 'EU' })]);
    });

    it('rejects a numeric ISO 4217 code', () => {
        // Arrange
        const value = '978';

        // Act
        const errors = collectFieldErrors(value, (path) => currencyCode(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'currencyCode', actualValue: '978' })]);
    });
});
