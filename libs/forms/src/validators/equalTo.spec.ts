import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { equalTo } from './equalTo';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('equalTo', () => {
    it('accepts a value equal to the expected value', () => {
        // Arrange
        const expectedValue = 'correct horse';

        // Act
        const errors = collectFieldErrors('correct horse', (path) => equalTo(path, expectedValue));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a differing value and reports both values', () => {
        // Arrange
        const expectedValue = 'correct horse';

        // Act
        const errors = collectFieldErrors('battery staple', (path) => equalTo(path, expectedValue));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'equalTo', actualValue: 'battery staple', expectedValue })]);
    });

    it('accepts NaN compared with NaN because the comparison uses Object.is', () => {
        // Arrange
        const expectedValue = Number.NaN;

        // Act
        const errors = collectFieldErrors(Number.NaN, (path) => equalTo(path, expectedValue));

        // Assert
        expect(errors).toEqual([]);
    });

    it('resolves a context-dependent expected value', () => {
        // Arrange
        const value = 'battery staple';

        // Act
        const errors = collectFieldErrors(value, (path) => equalTo(path, () => 'correct horse'));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'equalTo', expectedValue: 'correct horse' })]);
    });
});
