// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ICurrencyCodeValidationError } from './ICurrencyCodeValidationError';

// #endregion

const CURRENCY_CODE_PATTERN = /^[A-Z]{3}$/i;

/**
 * Validates the shape of an optional ISO 4217 alphabetic currency code (three letters, no currency table). Empty strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function currencyCode<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || (typeof value === 'string' && (value === '' || CURRENCY_CODE_PATTERN.test(value)))) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'currencyCode', actualValue: value, message }) satisfies ICurrencyCodeValidationError,
        );
    });
}
