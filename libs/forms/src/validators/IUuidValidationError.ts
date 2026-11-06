// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a string that is not a canonical RFC 9562 UUID.
 *
 * @public
 */
export interface IUuidValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'uuid';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
