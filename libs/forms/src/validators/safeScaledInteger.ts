// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ISafeScaledIntegerValidationError } from './ISafeScaledIntegerValidationError';

// #endregion

/**
 * Requires a present numeric value to remain a safe integer after multiplication by a fixed scale
 * factor (for example `100` for amounts stored in cents). Decimal precision is validated separately
 * by `maxDecimalPlaces`; `null` passes so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param factor The positive safe-integer scale factor.
 * @param config Optional custom message, error or activation condition.
 * @throws RangeError when `factor` is not a positive safe integer.
 */
export function safeScaledInteger<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<number | null, SchemaPathRules.Supported, TPathKind>,
    factor: number,
    config?: SignalValidatorConfig<number | null, TPathKind>,
): void {
    if (!Number.isSafeInteger(factor) || factor <= 0) {
        throw new RangeError('The scale factor must be a positive safe integer.');
    }

    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value === null || (Number.isFinite(value) && Number.isSafeInteger(Math.round(value * factor)))) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'safeScaledInteger', actualValue: value, factor, message }) satisfies ISafeScaledIntegerValidationError,
        );
    });
}
