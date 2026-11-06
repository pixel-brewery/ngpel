// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ITrimmedMinLengthValidationError } from './ITrimmedMinLengthValidationError';

// #endregion

/**
 * Validates the minimum length of a string after removing surrounding whitespace. Empty strings
 * pass so the validator composes with `required`; the error kind is `minLength` so it fills the
 * same error slot as Angular's built-in validator.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param minLength The minimum length of the trimmed text.
 * @param config Optional custom message, error or activation condition.
 */
export function trimmedMinLength<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    minLength: number,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || (typeof value === 'string' && (value === '' || value.trim().length >= minLength))) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'minLength', actualValue: value, minLength, message }) satisfies ITrimmedMinLengthValidationError,
        );
    });
}
