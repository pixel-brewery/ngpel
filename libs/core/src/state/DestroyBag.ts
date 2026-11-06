// #region Imports

import { DestroyRef, inject } from '@angular/core';
import { type DestroyBagTeardown } from './DestroyBagTeardown';

// #endregion

/**
 * A tiny teardown container that hooks into a `DestroyRef` once and lets you register everything
 * else imperatively: subscriptions, output subscriptions or plain callbacks.
 *
 * @public
 */
export type DestroyBag = {
    // #region Methods

    /**
     * Registers one or more teardown items. Items registered after destruction run immediately.
     */
    add(...entries: Array<DestroyBagTeardown | null | undefined>): void;

    /**
     * Executes all registered teardown items and marks the bag as destroyed.
     */
    destroy(): void;

    // #endregion
};

function isUnsubscribeLike(value: unknown): value is { unsubscribe(): void } {
    return value !== null && typeof value === 'object' && 'unsubscribe' in value && typeof value.unsubscribe === 'function';
}

class DestroyBagImpl implements DestroyBag {
    // #region Fields

    private readonly _items: Array<() => void> = [];
    private _destroyed = false;

    // #endregion

    // #region Ctor

    public constructor(destroyRef: DestroyRef) {
        destroyRef.onDestroy(() => this.destroy());
    }

    // #endregion

    // #region Methods

    public add(...entries: Array<DestroyBagTeardown | null | undefined>): void {
        for (const item of entries) {
            if (!item) {
                continue;
            }

            const teardown = isUnsubscribeLike(item) ? (): void => item.unsubscribe() : item;

            if (this._destroyed) {
                teardown();
                continue;
            }

            this._items.push(teardown);
        }
    }

    public destroy(): void {
        if (this._destroyed) {
            return;
        }

        this._destroyed = true;
        const pending = this._items.splice(0, this._items.length);
        for (const teardown of pending) {
            try {
                teardown();
            } catch {
                // Best-effort cleanup: one failing teardown must not prevent the others.
            }
        }
    }

    // #endregion
}

/**
 * Creates a new destroy bag tied to a `DestroyRef`. Co-located with the {@link DestroyBag} type
 * because a separate `destroyBag.ts` would collide with `DestroyBag.ts` on case-insensitive file
 * systems.
 *
 * @public
 * @param destroyRef The `DestroyRef` to hook into; injected from the current context when omitted.
 * @param entries Optional teardown items to register immediately.
 * @returns A new destroy bag.
 */
export function destroyBag(destroyRef?: DestroyRef, ...entries: Array<DestroyBagTeardown | null | undefined>): DestroyBag {
    const bag = new DestroyBagImpl(destroyRef ?? inject(DestroyRef));

    if (entries.length > 0) {
        bag.add(...entries);
    }

    return bag;
}
