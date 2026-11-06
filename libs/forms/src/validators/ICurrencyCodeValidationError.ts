// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for an invalid ISO 4217 alphabetic currency code.
 *
 * @public
 */
export interface ICurrencyCodeValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'currencyCode';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
