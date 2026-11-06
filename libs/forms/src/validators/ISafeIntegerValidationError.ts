// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a number that is not a safe integer.
 *
 * @public
 */
export interface ISafeIntegerValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'safeInteger';

    /** The rejected field value. */
    readonly actualValue: number;

    // #endregion
}
