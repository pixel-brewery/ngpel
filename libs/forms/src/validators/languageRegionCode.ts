// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { ILanguageRegionCodeValidationError } from './ILanguageRegionCodeValidationError';
import { isLanguageRegionCode } from './isLanguageRegionCode';

// #endregion

/**
 * Validates an optional normalized language-region code such as `de-DE`. Empty strings pass so the
 * validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function languageRegionCode<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || (typeof value === 'string' && (value === '' || isLanguageRegionCode(value)))) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'languageRegionCode', actualValue: value, message }) satisfies ILanguageRegionCodeValidationError,
        );
    });
}
