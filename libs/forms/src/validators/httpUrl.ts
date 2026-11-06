// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IHttpUrlValidationError } from './IHttpUrlValidationError';

// #endregion

/**
 * Validates that an optional string is an absolute HTTP or HTTPS URL with a hostname, as parsed by
 * the WHATWG `URL` constructor; surrounding whitespace is ignored. Empty strings pass so the
 * validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function httpUrl<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || (typeof value === 'string' && (value === '' || isHttpUrl(value.trim())))) {
            return null;
        }

        return resolveSignalValidatorError(config, context, (message) => ({ kind: 'httpUrl', actualValue: value, message }) satisfies IHttpUrlValidationError);
    });
}

function isHttpUrl(value: string): boolean {
    try {
        const url = new URL(value);

        return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.length > 0;
    } catch {
        return false;
    }
}
