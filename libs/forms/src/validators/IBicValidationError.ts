// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for an invalid ISO 9362 Business Identifier Code.
 *
 * @public
 */
export interface IBicValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'bic';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
