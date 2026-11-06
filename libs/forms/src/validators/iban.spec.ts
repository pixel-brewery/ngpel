import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { iban } from './iban';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('iban', () => {
    it('accepts a valid IBAN regardless of grouping and casing, plus empty text', () => {
        // Arrange
        const candidates = ['DE89370400440532013000', 'DE89 3704 0044 0532 0130 00', 'de89370400440532013000', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => iban(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects an IBAN whose mod-97 checksum does not match', () => {
        // Arrange
        const value = 'DE89370400440532013001';

        // Act
        const errors = collectFieldErrors(value, (path) => iban(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'iban', actualValue: 'DE89370400440532013001' })]);
    });

    it('rejects an IBAN whose country code is not registered', () => {
        // Arrange
        const value = 'ZZ89370400440532013000';

        // Act
        const errors = collectFieldErrors(value, (path) => iban(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'iban', actualValue: 'ZZ89370400440532013000' })]);
    });

    it('rejects an IBAN of the wrong length for its country', () => {
        // Arrange
        const value = 'DE8937040044053201300';

        // Act
        const errors = collectFieldErrors(value, (path) => iban(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'iban', actualValue: 'DE8937040044053201300' })]);
    });
});
