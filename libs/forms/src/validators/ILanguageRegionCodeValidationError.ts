// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted for an invalid language-region code such as `de-DE`.
 *
 * @public
 */
export interface ILanguageRegionCodeValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'languageRegionCode';

    /** The rejected field value. */
    readonly actualValue: string;

    // #endregion
}
