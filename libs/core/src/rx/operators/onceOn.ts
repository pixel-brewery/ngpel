// #region Imports

import { type Observable, type Observer, type Subscription } from 'rxjs';

// #endregion

/**
 * Subscribes once to a source, forwarding its values until completion, error or cancellation.
 *
 * @remarks
 * The historical name refers to one subscription, not one emitted value. Pass a source piped
 * through `take(1)` when only its first value is wanted. The result preserves the original
 * `{ observable }` handle and also exposes the subscription for explicit lifecycle cleanup.
 *
 * @public
 * @param observable The source to observe once.
 * @param nextOrObserver A `next` callback or a partial observer.
 * @returns The subscription, carrying the original source as `observable`.
 */
export function onceOn<T>(
    observable: Observable<T>,
    nextOrObserver: ((value: T) => void) | Partial<Observer<T>>,
): Subscription & { observable: Observable<T> } {
    const observer: Partial<Observer<T>> = typeof nextOrObserver === 'function' ? { next: nextOrObserver } : nextOrObserver;

    return Object.assign(observable.subscribe(observer), { observable });
}
