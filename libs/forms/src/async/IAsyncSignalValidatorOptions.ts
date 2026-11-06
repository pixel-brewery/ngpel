// #region Imports

import type { ResourceRef, Signal } from '@angular/core';
import type { AsyncValidatorOptions, PathKind, SchemaPath, SchemaPathRules } from '@angular/forms/signals';

// #endregion

/**
 * Options of {@link useAsyncValidator}: the validated path, how to derive request parameters from
 * the field value, the resource factory performing the check, and how results and failures map to
 * validation errors.
 *
 * @public
 * @typeParam TValue The value type of the validated field.
 * @typeParam TParams The parameters derived from the field value.
 * @typeParam TResult The result produced by the resource.
 * @typeParam TPathKind The kind of the validated path.
 */
export interface IAsyncSignalValidatorOptions<TValue, TParams, TResult, TPathKind extends PathKind = PathKind.Root> {
    // #region Properties

    /** Signal Forms schema path to validate. */
    readonly path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>;

    /** Derives the request parameters from the current field value. */
    readonly paramsFn: (context: { readonly value: Signal<TValue> }) => TParams;

    /** Creates the resource that performs the asynchronous check for the given parameters. */
    readonly factoryFn: (params: Signal<TParams | undefined>) => ResourceRef<TResult | undefined>;

    /** Maps a resolved result to a validation error, a list of errors, or `null` when valid. */
    readonly mapResultToError: (result: TResult | undefined, context: { readonly value: Signal<TValue> }) => unknown;

    /** Maps a rejected resource to validation errors; defaults to reporting no error. */
    readonly onError?: (error: unknown, context: { readonly value: Signal<TValue> }) => unknown;

    /** Activation condition forwarded to Angular's `validateAsync`. */
    readonly when?: AsyncValidatorOptions<TValue, TParams, TResult, TPathKind>['when'];

    // #endregion
}
