// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when a string contains no non-whitespace character. The kind aliases Angular's built-in `required` error so existing error slots match.
 *
 * @public
 */
export interface INonBlankValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'required';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
