// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for a structurally invalid IBAN or a failed IBAN checksum.
 *
 * @public
 */
export interface IIbanValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'iban';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
