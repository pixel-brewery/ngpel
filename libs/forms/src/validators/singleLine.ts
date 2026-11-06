// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ISingleLineValidationError } from './ISingleLineValidationError';

// #endregion

const INVALID_SINGLE_LINE_CHARACTER_PATTERN = /[\p{Cc}\p{Zl}\p{Zp}]/u;

/**
 * Validates that optional text can be represented on one line: control characters and Unicode line or paragraph separators are rejected. Empty strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function singleLine<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value.length === 0 || !INVALID_SINGLE_LINE_CHARACTER_PATTERN.test(value)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'singleLine', actualValue: value, message }) satisfies ISingleLineValidationError,
        );
    });
}
