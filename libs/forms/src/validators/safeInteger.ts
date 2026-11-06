// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ISafeIntegerValidationError } from './ISafeIntegerValidationError';

// #endregion

/**
 * Requires a present numeric value to be a safe integer (`Number.isSafeInteger`). `null` passes so
 * the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function safeInteger<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<number | null, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<number | null, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value === null || Number.isSafeInteger(value)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'safeInteger', actualValue: value, message }) satisfies ISafeIntegerValidationError,
        );
    });
}
