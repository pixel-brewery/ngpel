// #region Imports

import { assertInInjectionContext, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectParamMapSignal } from './injectParamMapSignal';
import type { IRouteParamSignalOptions } from './IRouteParamSignalOptions';
import type { UrlParamCodec } from './UrlParamCodec';
import type { UrlParamSignal } from './UrlParamSignal';

// #endregion

/**
 * Creates a bidirectional signal for a parameter declared in the route path. Must be called in an
 * injection context. Reading follows the activated URL; writing navigates to the URL tree the
 * `toUrlTree` policy returns.
 *
 * @public
 * @typeParam T The typed application value.
 * @param parameterName The parameter name as declared in the route path, without the colon.
 * @param codec The codec converting between the raw parameter and the typed value.
 * @param options The destination policy and history behavior.
 * @returns The URL-backed signal.
 *
 * @example
 * ```typescript
 * // Route: { path: 'newsletters/:newsletterId', component: NewsletterDetailView }
 * private readonly _newsletterId = routeParamSignal('newsletterId', fromNullable(positiveIntegerCodec), {
 *     toUrlTree: ({ serializedValue, router }) => router.createUrlTree(['/newsletters', serializedValue ?? ''])
 * });
 * ```
 */
export function routeParamSignal<T>(parameterName: string, codec: UrlParamCodec<T>, options: IRouteParamSignalOptions<T>): UrlParamSignal<T> {
    assertInInjectionContext(routeParamSignal);

    const route = inject(ActivatedRoute);
    const router = inject(Router);
    const paramMap = injectParamMapSignal('route');
    const value = computed<T | undefined>((): T | undefined => codec.parse(paramMap().get(parameterName)));

    const set = (nextValue: T | undefined): Promise<boolean> => {
        const serializedValue = (nextValue === undefined ? null : codec.serialize(nextValue)) ?? undefined;
        const targetUrl = options.toUrlTree({ value: nextValue, serializedValue, router, route });

        return router.navigateByUrl(targetUrl, { replaceUrl: options.replaceUrl ?? false });
    };

    return Object.assign(value, {
        set,
        update: (updater: (currentValue: T | undefined) => T | undefined): Promise<boolean> => set(updater(value())),
        clear: (): Promise<boolean> => set(undefined),
    });
}
