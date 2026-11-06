import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { hexColor } from './hexColor';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('hexColor', () => {
    it('accepts six-digit colors in either casing, with surrounding whitespace, and empty text', () => {
        // Arrange
        const candidates = ['#1A2B3C', '#ffffff', '  #000000  ', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => hexColor(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects the three-digit shorthand', () => {
        // Arrange
        const value = '#FFF';

        // Act
        const errors = collectFieldErrors(value, (path) => hexColor(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'hexColor', actualValue: '#FFF' })]);
    });

    it('rejects a color without its leading hash', () => {
        // Arrange
        const value = '1A2B3C';

        // Act
        const errors = collectFieldErrors(value, (path) => hexColor(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'hexColor', actualValue: '1A2B3C' })]);
    });
});
