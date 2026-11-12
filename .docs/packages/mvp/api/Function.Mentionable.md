---
title: 'Function: Mentionable()'
generated: true
editUrl: false
---
# Function: Mentionable()

```ts
function Mentionable<T>(base): PresenterBehaviorReturn<T, IMentionable>;
```

Defined in: [behaviors/Mentionable.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/Mentionable.ts#L19)

Registers a presenter's mention source for the duration of its initialized lifecycle.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | The presenter class to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`IMentionable`](Interface.IMentionable)\>

An abstract class that additionally implements [IMentionable](Interface.IMentionable).
