// #region Imports

import type { IApiFailure, IApiSuccess } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * Handlers applied by {@link matchResult} to the success and failure branches of an API result.
 *
 * @public
 */
export interface IMatchHandlers<TData, TResult = void> {
    // #region Properties

    /**
     * Invoked for successful results.
     */
    readonly onSuccess?: (result: IApiSuccess<TData>) => TResult;

    /**
     * Invoked for failed results.
     */
    readonly onError?: (result: IApiFailure) => TResult;

    // #endregion
}
