// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IPortValidationError } from './IPortValidationError';

// #endregion

const MIN_PORT = 1;
const MAX_PORT = 65535;

/**
 * Validates that an optional string is an integral TCP port number from 1 to 65535. Empty strings
 * pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function port<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value.length === 0 || isPort(value)) {
            return null;
        }

        return resolveSignalValidatorError(config, context, (message) => ({ kind: 'port', actualValue: value, message }) satisfies IPortValidationError);
    });
}

function isPort(value: string): boolean {
    const parsed = Number(value);

    return Number.isInteger(parsed) && parsed >= MIN_PORT && parsed <= MAX_PORT;
}
