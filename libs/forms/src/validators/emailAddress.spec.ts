import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, type SchemaFn, type ValidationError } from '@angular/forms/signals';
import { emailAddress } from './emailAddress';

/** Builds a single-field form over `value`, applies `schema` to its root path and returns that field's errors. */
function collectFieldErrors<TValue>(value: TValue, schema: SchemaFn<TValue>): ReadonlyArray<ValidationError.WithFieldTree> {
    const model = signal(value);
    const field = TestBed.runInInjectionContext(() => form(model, schema));

    return field().errors();
}

describe('emailAddress', () => {
    it('accepts qualified addresses, sub-addressing and empty text', () => {
        // Arrange
        const candidates = ['person@example.org', 'person+invoices@sub.example.co.uk', ''];

        // Act
        const errors = candidates.flatMap((candidate) => collectFieldErrors(candidate, (path) => emailAddress(path)));

        // Assert
        expect(errors).toEqual([]);
    });

    it('rejects an address without a qualified domain', () => {
        // Arrange
        const value = 'person@localhost';

        // Act
        const errors = collectFieldErrors(value, (path) => emailAddress(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'email', actualValue: 'person@localhost' })]);
    });

    it('rejects an address with consecutive dots', () => {
        // Arrange
        const value = 'person..invoices@example.org';

        // Act
        const errors = collectFieldErrors(value, (path) => emailAddress(path));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'email', actualValue: 'person..invoices@example.org' })]);
    });

    it('reports the configured message on the default error', () => {
        // Arrange
        const value = 'nope';

        // Act
        const errors = collectFieldErrors(value, (path) => emailAddress(path, { message: 'Please enter an email address.' }));

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'email', message: 'Please enter an email address.' })]);
    });
});
