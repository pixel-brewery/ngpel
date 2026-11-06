// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when a number carries more decimal places than allowed.
 *
 * @public
 */
export interface IMaxDecimalPlacesValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'maxDecimalPlaces';

    /** The rejected field value. */
    readonly actualValue: number;

    /** The maximum number of decimal places accepted. */
    readonly maxDecimalPlaces: number;

    // #endregion
}
