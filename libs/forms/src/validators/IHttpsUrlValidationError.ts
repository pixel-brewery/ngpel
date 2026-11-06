// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a string that is not an absolute HTTPS URL.
 *
 * @public
 */
export interface IHttpsUrlValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'httpsUrl';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
