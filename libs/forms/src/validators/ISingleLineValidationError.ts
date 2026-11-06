// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when text contains control characters or Unicode line or paragraph separators.
 *
 * @public
 */
export interface ISingleLineValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'singleLine';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
