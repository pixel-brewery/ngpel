import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { trimmedMaxLength } from './trimmedMaxLength';

describe('trimmedMaxLength', () => {
    it('accepts text whose trimmed length reaches the maximum', () => {
        // Arrange
        const model = signal('  note  ');
        const field = TestBed.runInInjectionContext(() => form(model, (path) => trimmedMaxLength(path, 4)));

        // Act
        const errors = field().errors();

        // Assert
        expect(errors).toEqual([]);
    });

    it('reports the original text and configured limit when trimmed text is too long', () => {
        // Arrange
        const model = signal('  notes  ');
        const field = TestBed.runInInjectionContext(() => form(model, (path) => trimmedMaxLength(path, 4, { message: 'Too long' })));

        // Act
        const errors = field().errors();

        // Assert
        expect(errors).toEqual([expect.objectContaining({ kind: 'maxLength', actualValue: '  notes  ', maxLength: 4, message: 'Too long' })]);
    });

    it('accepts optional whitespace and leaves presence to a separate validator', () => {
        // Arrange
        const model = signal('  ');
        const field = TestBed.runInInjectionContext(() => form(model, (path) => trimmedMaxLength(path, 0)));

        // Act
        const errors = field().errors();

        // Assert
        expect(errors).toEqual([]);
    });
});
