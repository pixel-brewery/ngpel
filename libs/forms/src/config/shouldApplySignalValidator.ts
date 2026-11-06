// #region Imports

import type { FieldContext, PathKind } from '@angular/forms/signals';
import type { SignalValidatorConfig } from './SignalValidatorConfig';

// #endregion

/**
 * Determines whether a validator applies to the current field state by evaluating the optional
 * `when` condition of its configuration. Validators without a condition always apply.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TPathKind The kind of the validated path.
 * @param config The validator configuration, if any.
 * @param context The field context of the validated field.
 * @returns `true` when the validator should run.
 */
export function shouldApplySignalValidator<TValue, TPathKind extends PathKind = PathKind.Root>(
    config: SignalValidatorConfig<TValue, TPathKind> | undefined,
    context: FieldContext<TValue, TPathKind>,
): boolean {
    return config?.when ? config.when(context) : true;
}
