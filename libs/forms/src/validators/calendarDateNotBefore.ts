// #region Imports

import { type PathKind, type SchemaPath, type SchemaPathRules, validate } from '@angular/forms/signals';
import { resolveSignalValidatorError } from '../config/resolveSignalValidatorError';
import { shouldApplySignalValidator } from '../config/shouldApplySignalValidator';
import type { SignalValidatorConfig } from '../config/SignalValidatorConfig';
import { isValidDate } from '../internal/isValidDate';
import { resolveDateReference } from '../internal/resolveDateReference';
import type { CalendarDateReference } from './CalendarDateReference';
import type { ICalendarDateNotBeforeValidationError } from './ICalendarDateNotBeforeValidationError';

// #endregion

/**
 * Requires a present valid `Date` to fall on or after a minimum calendar day. Times are deliberately
 * ignored because form dates represent business calendar days rather than instants; the comparison
 * uses the local calendar day of both values. Invalid dates are left to `validDate`; `null` values
 * and a `null` bound pass.
 *
 * @public
 * @typeParam TPathKind The kind of the validated path.
 * @param path Signal Forms schema path to validate.
 * @param minDate Earliest accepted calendar date or its context-dependent resolver.
 * @param config Optional custom message, error or activation condition.
 */
export function calendarDateNotBefore<TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<Date | null, SchemaPathRules.Supported, TPathKind>,
    minDate: CalendarDateReference<TPathKind>,
    config?: SignalValidatorConfig<Date | null, TPathKind>,
): void {
    validate(path, (context) => {
        const value = context.value();
        const resolvedMinDate = resolveDateReference(minDate, context);

        if (
            !shouldApplySignalValidator(config, context) ||
            value === null ||
            resolvedMinDate === null ||
            !isValidDate(value) ||
            !isValidDate(resolvedMinDate) ||
            toLocalCalendarDay(value) >= toLocalCalendarDay(resolvedMinDate)
        ) {
            return null;
        }

        return resolveSignalValidatorError(
            config,
            context,
            (message) =>
                ({ kind: 'calendarDateNotBefore', actualValue: value, minDate: resolvedMinDate, message }) satisfies ICalendarDateNotBeforeValidationError,
        );
    });
}

function toLocalCalendarDay(value: Date): number {
    return Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
}
