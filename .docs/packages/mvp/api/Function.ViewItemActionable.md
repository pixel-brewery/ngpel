---
title: 'Function: ViewItemActionable()'
generated: true
editUrl: false
---
# Function: ViewItemActionable()

```ts
function ViewItemActionable<T>(base): PresenterBehaviorReturn<T, IViewItemActionable>;
```

Defined in: item-actions/ViewItemActionable.ts:20

Adds only generic, registry-backed item actions to a mentionable presenter.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) & (...`args`) => [`IMentionable`](Interface.IMentionable) | Presenter constructor that supplies the current view items. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | Presenter constructor to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`IViewItemActionable`](Interface.IViewItemActionable)\>

A presenter constructor with contextual actions.
