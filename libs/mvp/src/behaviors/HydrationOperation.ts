// #region Imports

import type { Observable } from 'rxjs';

// #endregion

/**
 * What a presenter may return from `onHydrate()`: a stream, a promise, or `undefined` when the
 * initial presentation needs no asynchronous data.
 *
 * @public
 */
export type HydrationOperation = Observable<unknown> | Promise<unknown> | undefined;
