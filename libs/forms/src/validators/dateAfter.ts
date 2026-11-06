// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import { isValidDate } from '../internal/isValidDate';
import { resolveDateReference } from '../internal/resolveDateReference';
import type { DateReference } from './DateReference';
import type { IDateAfterValidationError } from './IDateAfterValidationError';

// #endregion

/**
 * Requires a present valid `Date` to be strictly after an exclusive lower bound, compared as
 * instants. Invalid dates are left to `validDate`; `null` values and a `null` bound pass.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param minimum Exclusive lower bound or its context-dependent resolver.
 * @param config Optional custom message, error or activation condition.
 */
export function dateAfter<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<Date | null, SchemaPathRules.Supported, TPathKind>,
    minimum: DateReference<TPathKind>,
    config?: SignalValidatorConfig<Date | null, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();
        const resolvedMinimum = resolveDateReference(minimum, context);

        if (
            !shouldApplySignalValidator(config, context) ||
            value === null ||
            resolvedMinimum === null ||
            !isValidDate(value) ||
            !isValidDate(resolvedMinimum) ||
            value.getTime() > resolvedMinimum.getTime()
        ) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) => ({ kind: 'dateAfter', actualValue: value, minimum: resolvedMinimum, message }) satisfies IDateAfterValidationError,
        );
    });
}
