// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a string that is not a fully qualified hostname.
 *
 * @public
 */
export interface IHostnameValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'hostname';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
