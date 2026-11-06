// #region Imports

import type { ValidationError } from '@angular/forms/signals';

// #endregion

/**
 * Validation error emitted when a calendar date precedes its minimum calendar day.
 *
 * @public
 */
export interface ICalendarDateNotBeforeValidationError extends ValidationError {
    // #region Properties

    readonly kind: 'calendarDateNotBefore';

    /** The rejected field value. */
    readonly actualValue: Date;

    /** The earliest accepted calendar date. */
    readonly minDate: Date;

    // #endregion
}
