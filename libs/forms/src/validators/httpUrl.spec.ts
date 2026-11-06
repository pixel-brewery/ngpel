import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { httpUrl } from './httpUrl';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('httpUrl', () => {
    it('accepts absolute http and https URLs, surrounding whitespace and empty text', () => {
        // Arrange
        const candidates = ['http://example.com', 'https://example.com/path?query=1#anchor', '  http://localhost:4200/  ', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => httpUrl(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects a URL with another scheme', () => {
        // Arrange
        const value = 'ftp://example.com';

        // Act
        const errors = collectFieldErrors(value, (path) => httpUrl(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'httpUrl', actualValue: 'ftp://example.com' })]);
    });

    it('rejects a relative URL without a scheme', () => {
        // Arrange
        const value = 'example.com/path';

        // Act
        const errors = collectFieldErrors(value, (path) => httpUrl(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'httpUrl', actualValue: 'example.com/path' })]);
    });
});
