// #region Imports

import type { IApiSuccess } from './IApiSuccess';

// #endregion

/**
 * Creates a successful API result envelope.
 *
 * @public
 * @param data The typed response data.
 * @param status The HTTP status code of the response.
 * @returns The success envelope.
 */
export function toApiSuccess<TData>(data: TData, status: number): IApiSuccess<TData> {
    return { success: true, status, data };
}
