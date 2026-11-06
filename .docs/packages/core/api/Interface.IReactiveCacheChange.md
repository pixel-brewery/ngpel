---
title: 'Interface: IReactiveCacheChange\<TValue\>'
generated: true
editUrl: false
---
# Interface: IReactiveCacheChange\<TValue\>

Defined in: [rx/cache/IReactiveCacheChange.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/IReactiveCacheChange.ts#L12)

Describes a single change event emitted by a [ReactiveCacheRegistrar](Class.ReactiveCacheRegistrar).

## Type Parameters

| Type Parameter |
| ------ |
| `TValue` |

## Properties

### items

```ts
readonly items: readonly TValue[];
```

Defined in: [rx/cache/IReactiveCacheChange.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/IReactiveCacheChange.ts#L23)

The current items in the cache after the change.

***

### reason

```ts
readonly reason: ReactiveCacheChangedReason;
```

Defined in: [rx/cache/IReactiveCacheChange.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/cache/IReactiveCacheChange.ts#L18)

The reason for the change.
