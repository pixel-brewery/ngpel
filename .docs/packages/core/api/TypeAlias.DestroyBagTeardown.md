---
title: 'Type Alias: DestroyBagTeardown'
generated: true
editUrl: false
---
# Type Alias: DestroyBagTeardown

```ts
type DestroyBagTeardown =
  | {
  unsubscribe: void;
}
  | (() => void);
```

Defined in: [state/DestroyBagTeardown.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/DestroyBagTeardown.ts#L7)

A teardown item a [DestroyBag](TypeAlias.DestroyBag) can own: anything with an `unsubscribe()` method (RxJS
subscriptions, Angular output subscriptions) or a plain callback.
