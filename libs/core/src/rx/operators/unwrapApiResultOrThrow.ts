import { ApiResultError, type IApiResult } from '@pixel-brewery/ngpel-core';
import { map, type OperatorFunction } from 'rxjs';

/**
 * Emits the data of a successful API result and turns a failure into an {@link ApiResultError}.
 *
 * @public
 * @typeParam TData The successful response data type.
 * @returns An RxJS operator that preserves the HTTP status and problem detail on failure.
 */
export function unwrapApiResultOrThrow<TData>(): OperatorFunction<IApiResult<TData>, TData> {
    return map((result) => {
        if (result.success) {
            return result.data;
        }

        throw new ApiResultError(result.problem, result.status);
    });
}
