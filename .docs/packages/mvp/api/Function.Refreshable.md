---
title: 'Function: Refreshable()'
generated: true
editUrl: false
---
# Function: Refreshable()

```ts
function Refreshable<T>(base): PresenterBehaviorReturn<T, IRefreshable>;
```

Defined in: [behaviors/Refreshable.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/behaviors/Refreshable.ts#L18)

Adds an explicit refresh command that is disabled while the presenter is loading.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | The presenter class to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`IRefreshable`](Interface.IRefreshable)\>

An abstract class that additionally implements [IRefreshable](Interface.IRefreshable).
