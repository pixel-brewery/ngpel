---
title: 'Type Alias: DestroyBag'
generated: true
editUrl: false
---
# Type Alias: DestroyBag

```ts
type DestroyBag = {
  add: void;
  destroy: void;
};
```

Defined in: [state/DestroyBag.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/DestroyBag.ts#L14)

A tiny teardown container that hooks into a `DestroyRef` once and lets you register everything
else imperatively: subscriptions, output subscriptions or plain callbacks.

## Methods

### add()

```ts
add(...entries): void;
```

Defined in: [state/DestroyBag.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/DestroyBag.ts#L20)

Registers one or more teardown items. Items registered after destruction run immediately.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`entries` | ( \| [`DestroyBagTeardown`](TypeAlias.DestroyBagTeardown) \| `null` \| `undefined`)[] |

#### Returns

`void`

***

### destroy()

```ts
destroy(): void;
```

Defined in: [state/DestroyBag.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/DestroyBag.ts#L25)

Executes all registered teardown items and marks the bag as destroyed.

#### Returns

`void`
