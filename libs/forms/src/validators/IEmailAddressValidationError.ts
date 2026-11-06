// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for an invalid email address.
 *
 * @public
 */
export interface IEmailAddressValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'email';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
