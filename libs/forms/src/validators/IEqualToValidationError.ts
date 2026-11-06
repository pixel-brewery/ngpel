// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when a value differs from its expected value.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 */
export interface IEqualToValidationError<TValue> extends ValidationError {
    // #region Properties

    readonly kind: 'equalTo';

    /** The rejected field value. */
    readonly actualValue: TValue;

    /** The value the field was expected to equal. */
    readonly expectedValue: TValue;

    // #endregion
}
