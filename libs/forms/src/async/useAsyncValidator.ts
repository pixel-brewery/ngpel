// #region Imports

import { type AsyncValidatorOptions, type PathKind, validateAsync } from '@angular/forms/signals';
import type { IAsyncSignalValidatorOptions } from './IAsyncSignalValidatorOptions';

// #endregion

/**
 * Registers an asynchronous Signal Forms validator that checks a field through a resource factory
 * (typically an HTTP lookup) and maps the result to validation errors. Rejections report no error
 * unless `onError` is configured.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TParams The parameters derived from the field value.
 * @typeParam TResult The result produced by the resource.
 * @typeParam TPathKind The kind of the validated path.
 * @param options Path, parameter derivation, resource factory, result mapping and activation condition.
 */
export function useAsyncValidator<TValue, TParams, TResult, TPathKind extends PathKind = PathKind.Root>(
    options: IAsyncSignalValidatorOptions<TValue, TParams, TResult, TPathKind>,
): void {
    validateAsync(options.path, {
        params: options.paramsFn,
        factory: options.factoryFn,
        onSuccess: options.mapResultToError,
        onError: options.onError ?? ((): null => null),
        when: options.when,
    } as AsyncValidatorOptions<TValue, TParams, TResult, TPathKind>);
}
