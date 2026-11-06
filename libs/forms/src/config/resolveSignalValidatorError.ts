// #region Imports

import type { FieldContext, OneOrMany, PathKind, ValidationError } from '@angular/forms/signals';
import { resolveSignalValidatorOption } from './resolveSignalValidatorOption';
import type { SignalValidatorConfig } from './SignalValidatorConfig';

// #endregion

/**
 * Produces the validation result of a failed validator: the configured custom `error` when one is
 * present, otherwise the validator's default error built by `createError` with the resolved
 * `message`. Product validators built on {@link SignalValidatorConfig} share this tail.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TPathKind The kind of the validated path.
 * @param config The validator configuration, if any.
 * @param context The field context of the validated field.
 * @param createError Builds the validator's default error from the resolved message.
 * @returns The error(s) to report; `undefined` when a configured error resolver produced nothing.
 */
export function resolveSignalValidatorError<TValue, TPathKind extends PathKind = PathKind.Root>(
    config: SignalValidatorConfig<TValue, TPathKind> | undefined,
    context: FieldContext<TValue, TPathKind>,
    createError: (message: string | undefined) => ValidationError.WithoutFieldTree,
): OneOrMany<ValidationError> | undefined {
    if (config?.error) {
        return resolveSignalValidatorOption(config.error, context);
    }

    return createError(resolveSignalValidatorOption(config?.message, context));
}
