// #region Imports

import { InjectionToken } from '@angular/core';

// #endregion

/**
 * The text {@link NotAvailablePipe} renders for a missing value. Defaults to the locale-neutral
 * `n/a`; provide a translated string once the application knows its locale.
 *
 * @example
 * ```typescript
 * providers: [{ provide: NOT_AVAILABLE_TEXT, useValue: '—' }]
 * ```
 *
 * @public
 */
export const NOT_AVAILABLE_TEXT = new InjectionToken<string>('NGPEL_NOT_AVAILABLE_TEXT', {
    providedIn: 'root',
    factory: (): string => 'n/a',
});
