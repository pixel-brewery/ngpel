// #region Imports

import { debounce, type PathKind } from '@angular/forms/signals';
import type { IAsyncSignalValidatorWithDebounceOptions } from './IAsyncSignalValidatorWithDebounceOptions';
import { useAsyncValidator } from './useAsyncValidator';

// #endregion

/**
 * Registers an asynchronous Signal Forms validator and, when a duration or debouncer is configured,
 * debounces the validated path first so the resource is not created on every keystroke.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TParams The parameters derived from the field value.
 * @typeParam TResult The result produced by the resource.
 * @typeParam TPathKind The kind of the validated path.
 * @param options Async validator options plus the optional debounce configuration.
 */
export function useAsyncValidatorWithDebounce<TValue, TParams, TResult, TPathKind extends PathKind = PathKind.Root>(
    options: IAsyncSignalValidatorWithDebounceOptions<TValue, TParams, TResult, TPathKind>,
): void {
    if (options.config?.durationOrDebouncer) {
        debounce(options.path, options.config.durationOrDebouncer);
    }

    useAsyncValidator(options);
}
