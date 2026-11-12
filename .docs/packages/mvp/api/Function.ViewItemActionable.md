---
title: 'Function: ViewItemActionable()'
generated: true
editUrl: false
---
# Function: ViewItemActionable()

```ts
function ViewItemActionable<T>(base): PresenterBehaviorReturn<T, IViewItemActionable>;
```

Defined in: [item-actions/ViewItemActionable.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/item-actions/ViewItemActionable.ts#L20)

Adds only generic, registry-backed item actions to a mentionable presenter.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* [`PresenterBehaviorBase`](TypeAlias.PresenterBehaviorBase) & (new (...`args`) => [`IMentionable`](Interface.IMentionable)) | Presenter constructor that supplies the current view items. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `base` | `T` | Presenter constructor to extend. |

## Returns

[`PresenterBehaviorReturn`](TypeAlias.PresenterBehaviorReturn)\<`T`, [`IViewItemActionable`](Interface.IViewItemActionable)\>

A presenter constructor with contextual actions.
