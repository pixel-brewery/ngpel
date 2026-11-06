// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when a date is not strictly after its exclusive lower bound.
 *
 * @public
 */
export interface IDateAfterValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'dateAfter';

    /** The rejected field value. */
    readonly actualValue: Date;

    /** The exclusive lower bound the value had to exceed. */
    readonly minimum: Date;

    // #endregion
}
