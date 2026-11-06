// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IHexColorValidationError } from './IHexColorValidationError';

// #endregion

const HEX_COLOR_PATTERN = /^#[0-9A-F]{6}$/i;

/**
 * Validates an optional six-digit hexadecimal color including its leading hash; surrounding whitespace is ignored. Empty strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function hexColor<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value.length === 0 || HEX_COLOR_PATTERN.test(value.trim())) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'hexColor', actualValue: value, message }) satisfies IHexColorValidationError,
        );
    });
}
