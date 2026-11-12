---
title: 'Interface: ISignalCacheChange\<TValue\>'
generated: true
editUrl: false
---
# Interface: ISignalCacheChange\<TValue\>

Defined in: [cache/ISignalCacheChange.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/ISignalCacheChange.ts#L12)

Describes a single change event emitted by a [SignalCacheRegistrar](Class.SignalCacheRegistrar).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tvalue"></a> `TValue` |

## Properties

### items

```ts
readonly items: readonly TValue[];
```

Defined in: [cache/ISignalCacheChange.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/ISignalCacheChange.ts#L23)

The current items in the cache after the change.

***

### reason

```ts
readonly reason: SignalCacheChangedReason;
```

Defined in: [cache/ISignalCacheChange.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/cache/ISignalCacheChange.ts#L18)

The reason for the change.
