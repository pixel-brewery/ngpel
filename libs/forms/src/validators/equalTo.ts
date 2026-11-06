// #region Imports

import { type FieldContext, type LogicFn, type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import type { EqualToReference } from './EqualToReference';
import type { IEqualToValidationError } from './IEqualToValidationError';

// #endregion

/**
 * Requires a value to equal a static or context-dependent reference value, compared with
 * `Object.is` (so `NaN` equals `NaN` and `+0` differs from `-0`). Typical use: a password
 * confirmation field resolving the reference through `context.valueOf(schema.password)`.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param expectedValue Expected value or its context-dependent resolver.
 * @param config Optional custom message, error or activation condition.
 */
export function equalTo<TValue, TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
    expectedValue: EqualToReference<TValue, TPathKind>,
    config?: SignalValidatorConfig<TValue, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();
        const resolvedExpectedValue = resolveEqualToReference(expectedValue, context);

        if (!shouldApplySignalValidator(config, context) || Object.is(value, resolvedExpectedValue)) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'equalTo', actualValue: value, expectedValue: resolvedExpectedValue, message }) satisfies IEqualToValidationError<TValue>,
        );
    });
}

function resolveEqualToReference<TValue, TPathKind extends PathKind>(
    reference: EqualToReference<TValue, TPathKind>,
    context: FieldContext<TValue, TPathKind>,
): TValue {
    return typeof reference === 'function' ? (reference as LogicFn<TValue, TValue, TPathKind>)(context) : reference;
}
