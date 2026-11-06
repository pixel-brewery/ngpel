// #region Imports

import { type LogicFn, type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { IAllowedValueValidationError } from './IAllowedValueValidationError';

// #endregion

/**
 * Requires a value to be part of an allowed set (`Array.prototype.includes` semantics).
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param allowedValues Accepted values or a resolver that reads sibling fields or other signals.
 * @param config Optional custom message, error or activation condition.
 */
export function allowedValue<TValue, TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
    allowedValues: ReadonlyArray<TValue> | LogicFn<TValue, ReadonlyArray<TValue>, TPathKind>,
    config?: SignalValidatorConfig<TValue, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();

        if (!shouldApplySignalValidator(config, context)) {
            return null;
        }

        const values = typeof allowedValues === 'function' ? allowedValues(context) : allowedValues;

        if (values.includes(value)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'allowedValue', actualValue: value, allowedValues: values, message }) satisfies IAllowedValueValidationError<TValue>,
        );
    });
}
