import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type FieldContext, form, validate } from '@angular/forms/signals';
import { shouldApplySignalValidator } from './shouldApplySignalValidator';

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

describe('shouldApplySignalValidator', () => {
    it('applies the validator when no condition is configured', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const shouldApply = shouldApplySignalValidator({ message: 'Please enter a name.' }, context);

        // Assert
        expect(shouldApply).toBe(true);
    });

    it('applies the validator when the condition holds', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const shouldApply = shouldApplySignalValidator({ when: (fieldContext) => fieldContext.value().length > 0 }, context);

        // Assert
        expect(shouldApply).toBe(true);
    });

    it('skips the validator while the condition fails', () => {
        // Arrange
        const context = createFieldContext('');

        // Act
        const shouldApply = shouldApplySignalValidator({ when: (fieldContext) => fieldContext.value().length > 0 }, context);

        // Assert
        expect(shouldApply).toBe(false);
    });

    it('applies the validator when no configuration is passed at all', () => {
        // Arrange
        const context = createFieldContext('Ada');

        // Act
        const shouldApply = shouldApplySignalValidator(undefined, context);

        // Assert
        expect(shouldApply).toBe(true);
    });
});
