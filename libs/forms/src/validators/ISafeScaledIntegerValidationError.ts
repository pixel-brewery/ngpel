// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when a number leaves JavaScript's safe-integer range once multiplied by
 * its scale factor.
 *
 * @public
 */
export interface ISafeScaledIntegerValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'safeScaledInteger';

    /** The rejected field value. */
    readonly actualValue: number;

    /** The scale factor the value was multiplied by. */
    readonly factor: number;

    // #endregion
}
