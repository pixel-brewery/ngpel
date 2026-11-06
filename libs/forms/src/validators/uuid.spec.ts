import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { uuid } from './uuid';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('uuid', () => {
    it('accepts canonical UUIDs in either casing and empty text', () => {
        // Arrange
        const candidates = ['3f2504e0-4f89-41d3-9a0c-0305e82c3301', '3F2504E0-4F89-41D3-9A0C-0305E82C3301', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => uuid(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects the nil UUID because its version nibble is zero', () => {
        // Arrange
        const value = '00000000-0000-0000-0000-000000000000';

        // Act
        const errors = collectFieldErrors(value, (path) => uuid(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'uuid', actualValue: '00000000-0000-0000-0000-000000000000' })]);
    });

    it('rejects text that is not a UUID', () => {
        // Arrange
        const value = '3f2504e0-4f89-41d3-9a0c';

        // Act
        const errors = collectFieldErrors(value, (path) => uuid(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'uuid', actualValue: '3f2504e0-4f89-41d3-9a0c' })]);
    });
});
