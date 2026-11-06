// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ITrimmedMaxLengthValidationError } from './ITrimmedMaxLengthValidationError';

// #endregion

/**
 * Checks the maximum length of a string after trimming surrounding whitespace. Use `nonBlank`
 * alongside it when the field also requires a value.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param maxLength The maximum length after trimming.
 * @param config Optional custom message, error or activation condition.
 */
export function trimmedMaxLength<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    maxLength: number,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || (typeof value === 'string' && value.trim().length <= maxLength)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'maxLength', actualValue: value, maxLength, message }) satisfies ITrimmedMaxLengthValidationError,
        );
    });
}
