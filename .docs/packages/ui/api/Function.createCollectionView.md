---
title: 'Function: createCollectionView()'
generated: true
editUrl: false
---
# Function: createCollectionView()

```ts
function createCollectionView<TItem, TView, TCalendarItem>(config): ICollectionView<TItem, TView, TCalendarItem>;
```

Defined in: [libs/ui/src/collection-view/factory/createCollectionView.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/factory/createCollectionView.ts#L35)

Creates a signal-based collection-view model from a declarative configuration.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-titem"></a> `TItem` | - |
| <a id="type-parameter-tview"></a> `TView` *extends* `string` | - |
| <a id="type-parameter-tcalendaritem"></a> `TCalendarItem` | `TItem` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`ICollectionViewConfig`](Interface.ICollectionViewConfig)\<`TItem`, `TView`, `TCalendarItem`\> | The collection-view configuration. |

## Returns

[`ICollectionView`](Interface.ICollectionView)\<`TItem`, `TView`, `TCalendarItem`\>

The runtime collection-view model.
