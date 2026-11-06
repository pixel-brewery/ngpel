// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IHttpsUrlValidationError } from './IHttpsUrlValidationError';

// #endregion

/** HTTPS URL with a required scheme and hostname plus an optional port, path, query and fragment. */
const HTTPS_URL_PATTERN = /^https:\/\/[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*(:\d{1,5})?(\/[^\s]*)?$/i;

/**
 * Validates that an optional string is an absolute HTTPS URL; plain HTTP is rejected. Empty strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function httpsUrl<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value.length === 0 || HTTPS_URL_PATTERN.test(value)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'httpsUrl', actualValue: value, message }) satisfies IHttpsUrlValidationError,
        );
    });
}
