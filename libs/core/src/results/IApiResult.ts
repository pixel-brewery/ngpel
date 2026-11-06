// #region Imports

import type { IApiFailure } from './IApiFailure';
import type { IApiSuccess } from './IApiSuccess';

// #endregion

/**
 * Discriminated union type for API responses. Narrow through the `success` discriminator.
 *
 * @example
 * ```typescript
 * if (result.success) {
 *     console.log(result.data); // typed as TData
 * } else {
 *     console.error(result.problem.code); // typed as IProblemDetail
 * }
 * ```
 *
 * @public
 */
export type IApiResult<TData> = IApiSuccess<TData> | IApiFailure;
