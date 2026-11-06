// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a number that is `NaN` or infinite.
 *
 * @public
 */
export interface IFiniteValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'finite';

    /** The rejected field value. */
    readonly actualValue: number;

    // #endregion
}
