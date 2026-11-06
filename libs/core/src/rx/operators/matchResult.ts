// #region Imports

import type { IApiResult } from '@pixel-brewery/ngpel-core';
import { map, type Observable, type OperatorFunction } from 'rxjs';
import type { IMatchHandlers } from './IMatchHandlers';

// #endregion

/**
 * Operator which takes a stream of {@link IApiResult} and applies the matching handler for the
 * success or failure branch.
 *
 * @public
 * @param handlers The success and failure handlers.
 */
export function matchResult<TData, TResult = void>(handlers: IMatchHandlers<TData, TResult>): OperatorFunction<IApiResult<TData>, TResult | void> {
    return (source: Observable<IApiResult<TData>>): Observable<TResult | void> =>
        source.pipe(
            map((result) => {
                if (result.success) {
                    return handlers.onSuccess ? handlers.onSuccess(result) : undefined;
                }

                return handlers.onError ? handlers.onError(result) : undefined;
            }),
        );
}
