// #region Imports

import type { Debouncer, PathKind } from '@angular/forms/signals';
import type { IAsyncSignalValidatorOptions } from './IAsyncSignalValidatorOptions';

// #endregion

/**
 * Options of {@link useAsyncValidatorWithDebounce}: the async validator options plus an optional
 * debounce applied to the validated path before the validator is registered.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TParams The parameters derived from the field value.
 * @typeParam TResult The result produced by the resource.
 * @typeParam TPathKind The kind of the validated path.
 */
export interface IAsyncSignalValidatorWithDebounceOptions<
    TValue,
    TParams,
    TResult,
    TPathKind extends PathKind = PathKind.Root,
> extends IAsyncSignalValidatorOptions<TValue, TParams, TResult, TPathKind> {
    // #region Properties

    /** Debounce configuration; omitted or a falsy duration registers the validator undebounced. */
    readonly config?: {
        readonly durationOrDebouncer?: number | Debouncer<TValue, TPathKind>;
    };

    // #endregion
}
