// #region Imports

import { InjectionToken } from '@angular/core';

// #endregion

/**
 * The text {@link BytesPipe} renders for an unknown size, that is `null`, `undefined` or a
 * non-finite number. Defaults to `0 B`; provide a translated string such as "measuring…" where a
 * size is still being determined.
 *
 * @example
 * ```typescript
 * providers: [{ provide: BYTES_FALLBACK_TEXT, useValue: '—' }]
 * ```
 *
 * @public
 */
export const BYTES_FALLBACK_TEXT = new InjectionToken<string>('NGPEL_BYTES_FALLBACK_TEXT', {
    providedIn: 'root',
    factory: (): string => '0 B',
});
