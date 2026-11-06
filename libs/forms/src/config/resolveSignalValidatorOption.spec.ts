import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type FieldContext, form, validate } from '@angular/forms/signals';
import { resolveSignalValidatorOption } from './resolveSignalValidatorOption';

/** Builds a single-field form over a text and returns the real `FieldContext` Angular passes to a validator. */
function createFieldContext(value: string): FieldContext<string> {
    const model = signal(value);
    let capturedContext: FieldContext<string> | undefined;

    const field = TestBed.runInInjectionContext(() =>
        form(model, (path) => {
            validate(path, (context) => {
                capturedContext = context;

                return null;
            });
        }),
    );

    field().errors();

    if (capturedContext === undefined) {
        throw new Error('The validator did not run, so no field context was captured.');
    }

    return capturedContext;
}

describe('resolveSignalValidatorOption', () => {
    it('returns a static option unchanged', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const resolved = resolveSignalValidatorOption<string, string>('Please enter a name.', context);

        // Assert
        expect(resolved).toBe('Please enter a name.');
    });

    it('evaluates a resolver against the field context', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const resolved = resolveSignalValidatorOption<string, string>((fieldContext) => `"${fieldContext.value()}" is not allowed.`, context);

        // Assert
        expect(resolved).toBe('"Ada" is not allowed.');
    });

    it('returns undefined when no option is configured', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const resolved = resolveSignalValidatorOption<string, string>(undefined, context);

        // Assert
        expect(resolved).toBeUndefined();
    });
});
