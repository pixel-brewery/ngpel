// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when trimmed text is shorter than its minimum length. The kind aliases
 * Angular's built-in `minLength` error so existing error slots match.
 *
 * @public
 */
export interface ITrimmedMinLengthValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'minLength';

    /** The rejected field value. */
    readonly actualValue: string;

    /** The minimum length of the trimmed text. */
    readonly minLength: number;

    // #endregion
}
