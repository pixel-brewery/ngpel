// #region Imports

import type { FieldContext, LogicFn, PathKind } from '@angular/forms/signals';

// #endregion

/**
 * Resolves a validator option that is either a static value or a `LogicFn` evaluated against the
 * field context.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TOption The option type once resolved.
 * @typeParam TPathKind The kind of the validated path.
 * @param option The static option, its field-context resolver, or `undefined`.
 * @param context The field context of the validated field.
 * @returns The resolved option, or `undefined` when no option was configured.
 */
export function resolveSignalValidatorOption<TValue, TOption, TPathKind extends PathKind = PathKind.Root>(
    option: TOption | LogicFn<TValue, TOption, TPathKind> | undefined,
    context: FieldContext<TValue, TPathKind>,
): TOption | undefined {
    if (typeof option === 'function') {
        return (option as LogicFn<TValue, TOption, TPathKind>)(context);
    }

    return option;
}
