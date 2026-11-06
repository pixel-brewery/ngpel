// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IMaxDecimalPlacesValidationError } from './IMaxDecimalPlacesValidationError';

// #endregion

/**
 * Validates the maximum decimal precision of a present finite number. Non-finite numbers and `null`
 * pass so the validator composes with `finite` and `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param decimalPlaces The maximum number of decimal places accepted.
 * @param config Optional custom message, error or activation condition.
 */
export function maxDecimalPlaces<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<number | null, SchemaPathRules.Supported, TPathKind>,
    decimalPlaces: number,
    config?: SignalValidatorConfig<number | null, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value === null || !Number.isFinite(value) || hasAtMostDecimalPlaces(value, decimalPlaces)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) =>
                ({ kind: 'maxDecimalPlaces', actualValue: value, maxDecimalPlaces: decimalPlaces, message }) satisfies IMaxDecimalPlacesValidationError,
        );
    });
}

function hasAtMostDecimalPlaces(value: number, decimalPlaces: number): boolean {
    const rounded = Number(value.toFixed(decimalPlaces));

    return Math.abs(value - rounded) <= Number.EPSILON * Math.max(1, Math.abs(value));
}
