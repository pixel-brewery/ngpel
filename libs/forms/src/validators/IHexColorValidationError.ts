// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for an invalid six-digit hexadecimal color.
 *
 * @public
 */
export interface IHexColorValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'hexColor';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
