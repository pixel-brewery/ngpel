// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a string that is not a TCP port number between 1 and 65535.
 *
 * @public
 */
export interface IPortValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'port';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
