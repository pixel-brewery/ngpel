// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when trimmed text exceeds its maximum length. The kind matches
 * Angular's built-in `maxLength` error.
 *
 * @public
 */
export interface ITrimmedMaxLengthValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'maxLength';

    /** The rejected field value. */
    readonly actualValue: string;

    /** The maximum length of the trimmed text. */
    readonly maxLength: number;

    // #endregion
}
