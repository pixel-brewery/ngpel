// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a string that is not an absolute HTTP or HTTPS URL.
 *
 * @public
 */
export interface IHttpUrlValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'httpUrl';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
