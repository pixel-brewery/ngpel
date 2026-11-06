// #region Imports

import type { FieldContext, LogicFn, PathKind } from '@angular/forms/signals';

// #endregion

/**
 * Resolves a static or context-dependent date reference used by the date validators.
 *
 * @internal
 * @param reference The static date, `null`, or its field-context resolver.
 * @param context The field context of the validated field.
 */
export function resolveDateReference<TPathKind extends PathKind>(
    reference: Date | null | LogicFn<Date | null, Date | null, TPathKind>,
    context: FieldContext<Date | null, TPathKind>,
): Date | null {
    return typeof reference === 'function' ? reference(context) : reference;
}
