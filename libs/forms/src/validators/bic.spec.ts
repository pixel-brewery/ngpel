import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { bic } from './bic';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('bic', () => {
    it('accepts eight- and eleven-character codes and empty text', () => {
        // Arrange
        const candidates = ['DEUTDEFF', 'DEUTDEFF500', 'deutdeff', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => bic(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a code whose bank part contains digits', () => {
        // Arrange
        const value = 'DEUT1EFF';

        // Act
        const errors = collectFieldErrors(value, (path) => bic(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'bic', actualValue: 'DEUT1EFF' })]);
    });

    it('rejects a code of an unsupported length', () => {
        // Arrange
        const value = 'DEUTDEFF5';

        // Act
        const errors = collectFieldErrors(value, (path) => bic(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'bic', actualValue: 'DEUTDEFF5' })]);
    });
});
