// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IHostnameValidationError } from './IHostnameValidationError';

// #endregion

/**
 * Fully qualified domain name per RFC 5321: alphanumeric labels with inner hyphens, at least two
 * labels, at most 253 characters.
 */
const HOSTNAME_PATTERN = /^(?!.{254})[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i;

/**
 * Validates that an optional string is a fully qualified hostname per RFC 5321 (single-label names such as `localhost` are rejected). Empty strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function hostname<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value.length === 0 || HOSTNAME_PATTERN.test(value)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'hostname', actualValue: value, message }) satisfies IHostnameValidationError,
        );
    });
}
