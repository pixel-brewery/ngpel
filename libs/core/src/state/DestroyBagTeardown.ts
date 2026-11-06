/**
 * A teardown item a {@link DestroyBag} can own: anything with an `unsubscribe()` method (RxJS
 * subscriptions, Angular output subscriptions) or a plain callback.
 *
 * @public
 */
export type DestroyBagTeardown = { unsubscribe(): void } | (() => void);
