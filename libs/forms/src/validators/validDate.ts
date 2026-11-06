// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import { isValidDate } from '../internal/isValidDate';
import type { IValidDateValidationError } from './IValidDateValidationError';

// #endregion

/**
 * Requires a present value to be a `Date` with a valid timestamp; invalid dates and non-date
 * runtime values are rejected. `null` passes so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function validDate<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<Date | null, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<Date | null, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value === null || isValidDate(value)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'validDate', actualValue: value, message }) satisfies IValidDateValidationError,
        );
    });
}
