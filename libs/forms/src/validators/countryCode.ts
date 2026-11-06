// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ICountryCodeValidationError } from './ICountryCodeValidationError';

// #endregion

const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/i;

/**
 * Validates the shape of an optional ISO 3166-1 alpha-2 country code (two letters, no country table). Empty strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function countryCode<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || (typeof value === 'string' && (value === '' || COUNTRY_CODE_PATTERN.test(value)))) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'countryCode', actualValue: value, message }) satisfies ICountryCodeValidationError,
        );
    });
}
