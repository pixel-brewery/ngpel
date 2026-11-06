---
title: 'Function: destroyBag()'
generated: true
editUrl: false
---
# Function: destroyBag()

```ts
function destroyBag(destroyRef?, ...entries): DestroyBag;
```

Defined in: [state/DestroyBag.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/state/DestroyBag.ts#L98)

Creates a new destroy bag tied to a `DestroyRef`. Co-located with the [DestroyBag](TypeAlias.DestroyBag) type
because a separate `destroyBag.ts` would collide with `DestroyBag.ts` on case-insensitive file
systems.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `destroyRef?` | `DestroyRef` | The `DestroyRef` to hook into; injected from the current context when omitted. |
| ...`entries?` | ( \| [`DestroyBagTeardown`](TypeAlias.DestroyBagTeardown) \| `null` \| `undefined`)[] | Optional teardown items to register immediately. |

## Returns

[`DestroyBag`](TypeAlias.DestroyBag)

A new destroy bag.
