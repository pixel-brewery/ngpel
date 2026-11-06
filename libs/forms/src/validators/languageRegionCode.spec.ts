import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { languageRegionCode } from './languageRegionCode';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('languageRegionCode', () => {
    it('accepts normalized codes and empty text', () => {
        // Arrange
        const candidates = ['de-DE', 'en-US', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => languageRegionCode(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects an unnormalized region subtag', () => {
        // Arrange
        const value = 'de-de';

        // Act
        const errors = collectFieldErrors(value, (path) => languageRegionCode(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'languageRegionCode', actualValue: 'de-de' })]);
    });

    it('rejects a bare language tag', () => {
        // Arrange
        const value = 'de';

        // Act
        const errors = collectFieldErrors(value, (path) => languageRegionCode(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'languageRegionCode', actualValue: 'de' })]);
    });
});
