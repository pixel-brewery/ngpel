// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when a value is not part of the allowed set.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 */
export interface IAllowedValueValidationError<TValue> extends ValidationError {
    // #region Properties

    readonly kind: 'allowedValue';

    /** The rejected field value. */
    readonly actualValue: TValue;

    /** The values the field accepts. */
    readonly allowedValues: ReadonlyArray<TValue>;

    // #endregion
}
