// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for an invalid ISO 3166-1 alpha-2 country code.
 *
 * @public
 */
export interface ICountryCodeValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'countryCode';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
