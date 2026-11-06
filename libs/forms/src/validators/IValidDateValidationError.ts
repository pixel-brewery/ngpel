// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a value that is not a `Date` with a valid timestamp.
 *
 * @public
 */
export interface IValidDateValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'validDate';

    /** The rejected field value. */
    readonly actualValue: Date;

    // #endregion
}
