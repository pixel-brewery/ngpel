// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { isEmailAddress } from '@pixel-brewery/ngpel-core';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IEmailAddressValidationError } from './IEmailAddressValidationError';

// #endregion

/**
 * Validates an optional email address with a qualified domain using the framework-free
 * `isEmailAddress` predicate of `@pixel-brewery/ngpel-core`, so pipes and validators agree on one
 * definition. Empty strings pass so the validator composes with `required`.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param config Optional custom message, error or activation condition.
 */
export function emailAddress<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
    config?: SignalValidatorConfig<string, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context) || value.length === 0 || isEmailAddress(value)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'email', actualValue: value, message }) satisfies IEmailAddressValidationError,
        );
    });
}
