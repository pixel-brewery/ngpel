// #region Imports

import { DestroyRef, inject, type Signal, signal } from '@angular/core';
import { ActivatedRoute, type ParamMap } from '@angular/router';

// #endregion

/**
 * One router source per parameter kind, shared by every signal created in the same injection
 * lifecycle for the same route.
 */
interface ISourceCache {
    readonly route: ActivatedRoute;
    routeParamMap?: Signal<ParamMap>;
    queryParamMap?: Signal<ParamMap>;
}

let sourceCacheByLifecycle: WeakMap<DestroyRef, ISourceCache> | undefined;

/**
 * Reads the router parameter map of the activated route as a signal, reusing one subscription per
 * injection lifecycle so a presenter with eight URL-backed signals still holds one router
 * subscription per parameter kind.
 *
 * @internal
 * @param source Whether to read the route parameters or the query parameters.
 * @returns The parameter map signal.
 */
export function injectParamMapSignal(source: 'route' | 'query'): Signal<ParamMap> {
    const lifecycle = inject(DestroyRef);
    const route = inject(ActivatedRoute);
    const caches = (sourceCacheByLifecycle ??= new WeakMap<DestroyRef, ISourceCache>());

    let cache = caches.get(lifecycle);
    if (cache === undefined || cache.route !== route) {
        cache = { route };
        caches.set(lifecycle, cache);
    }

    if (source === 'route') {
        return (cache.routeParamMap ??= toParamMapSignal(route.paramMap, route.snapshot.paramMap, lifecycle));
    }

    return (cache.queryParamMap ??= toParamMapSignal(route.queryParamMap, route.snapshot.queryParamMap, lifecycle));
}

/**
 * Mirrors a router parameter map observable into a signal for the lifetime of `lifecycle`.
 */
function toParamMapSignal(source: ActivatedRoute['paramMap'], initialValue: ParamMap, lifecycle: DestroyRef): Signal<ParamMap> {
    const value = signal<ParamMap>(initialValue);
    const subscription = source.subscribe((paramMap): void => value.set(paramMap));

    lifecycle.onDestroy((): void => subscription.unsubscribe());

    return value.asReadonly();
}
