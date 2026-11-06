---
title: 'Function: defineTableCollectionView()'
generated: true
editUrl: false
---
# Function: defineTableCollectionView()

```ts
function defineTableCollectionView<TItem, TView>(config): ICollectionTableViewConfig<TItem, TView>;
```

Defined in: [libs/ui/src/collection-view/views/table/defineTableCollectionView.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/defineTableCollectionView.ts#L16)

Defines a table collection view with full type inference.

## Type Parameters

| Type Parameter |
| ------ |
| `TItem` |
| `TView` *extends* `string` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Omit`\<[`ICollectionTableViewConfig`](Interface.ICollectionTableViewConfig)\<`TItem`, `TView`\>, `"viewKind"`\> | The table view configuration. |

## Returns

[`ICollectionTableViewConfig`](Interface.ICollectionTableViewConfig)\<`TItem`, `TView`\>

The table view configuration.
