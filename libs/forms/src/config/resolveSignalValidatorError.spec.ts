import { type FieldContext, form, validate, type ValidationError } from '@angular/forms/signals';
import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { resolveSignalValidatorError } from './resolveSignalValidatorError';

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

function createDefaultError(message: string | undefined): ValidationError.WithoutFieldTree {
    return { kind: 'default', message };
}

describe('resolveSignalValidatorError', () => {
    it('builds the default error with the resolved message', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const error = resolveSignalValidatorError({ message: (fieldContext) => `"${fieldContext.value()}" is not allowed.` }, context, createDefaultError);

        // Assert
        expect(error).toEqual({ kind: 'default', message: '"Ada" is not allowed.' });
    });

    it('builds the default error without a message when none is configured', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const error = resolveSignalValidatorError(undefined, context, createDefaultError);

        // Assert
        expect(error).toEqual({ kind: 'default', message: undefined });
    });

    it('prefers a configured custom error over the default error', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const error = resolveSignalValidatorError({ error: { kind: 'custom' } }, context, createDefaultError);

        // Assert
        expect(error).toEqual({ kind: 'custom' });
    });

    it('evaluates a custom error resolver against the field context', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const error = resolveSignalValidatorError(
            { error: (fieldContext) => [{ kind: 'custom', message: fieldContext.value() }] },
            context,
            createDefaultError,
        );

        // Assert
        expect(error).toEqual([{ kind: 'custom', message: 'Ada' }]);
    });
});
