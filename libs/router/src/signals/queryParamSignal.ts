// #region Imports

import { Location } from '@angular/common';
import { assertInInjectionContext, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { IQueryParamSignalOptions } from './IQueryParamSignalOptions';
import { injectParamMapSignal } from './injectParamMapSignal';
import type { UrlParamCodec } from './UrlParamCodec';
import type { UrlParamSignal } from './UrlParamSignal';

// #endregion

/**
 * Creates a bidirectional signal for one optional query parameter. Must be called in an injection
 * context. Writing preserves unrelated parameters from the current browser URL, including repeated
 * ones and changes made through `Location` outside a router navigation.
 *
 * @public
 * @typeParam T The typed application value.
 * @param parameterName The query parameter name.
 * @param codec The codec converting between the raw parameter and the typed value.
 * @param options The history behavior and fragment handling.
 * @returns The URL-backed signal.
 *
 * @example
 * ```typescript
 * // /newsletters?status=draft
 * private readonly _status = queryParamSignal('status', fromNullable(enumCodec(['draft', 'published'])));
 * ```
 */
export function queryParamSignal<T>(parameterName: string, codec: UrlParamCodec<T>, options: IQueryParamSignalOptions = {}): UrlParamSignal<T> {
    assertInInjectionContext(queryParamSignal);

    const location = inject(Location);
    const router = inject(Router);
    const paramMap = injectParamMapSignal('query');
    const value = computed<T | undefined>((): T | undefined => codec.parse(paramMap().get(parameterName)));

    const set = (nextValue: T | undefined): Promise<boolean> => {
        const targetUrl = router.parseUrl(location.path(true));
        const queryParams = { ...targetUrl.queryParams };
        const serializedValue = nextValue === undefined ? null : codec.serialize(nextValue);

        if (serializedValue === null) {
            delete queryParams[parameterName];
        } else {
            queryParams[parameterName] = serializedValue;
        }

        targetUrl.queryParams = queryParams;
        if (options.preserveFragment === false) {
            targetUrl.fragment = null;
        }

        return router.navigateByUrl(targetUrl, { replaceUrl: options.replaceUrl ?? false });
    };

    return Object.assign(value, {
        set,
        update: (updater: (currentValue: T | undefined) => T | undefined): Promise<boolean> => set(updater(value())),
        clear: (): Promise<boolean> => set(undefined),
    });
}
