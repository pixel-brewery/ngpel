---
title: 'Function: defineFlowCollectionView()'
generated: true
editUrl: false
---
# Function: defineFlowCollectionView()

```ts
function defineFlowCollectionView<TItem, TView, TColumnKey>(config): ICollectionFlowViewConfig<TItem, TView, TColumnKey>;
```

Defined in: [libs/ui/src/collection-view/views/flow/defineFlowCollectionView.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/defineFlowCollectionView.ts#L16)

Defines a flow collection view with full type inference.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-titem"></a> `TItem` | - |
| <a id="type-parameter-tview"></a> `TView` *extends* `string` | - |
| <a id="type-parameter-tcolumnkey"></a> `TColumnKey` *extends* `string` | `string` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Omit`\<[`ICollectionFlowViewConfig`](Interface.ICollectionFlowViewConfig)\<`TItem`, `TView`, `TColumnKey`\>, `"viewKind"`\> | The flow view configuration. |

## Returns

[`ICollectionFlowViewConfig`](Interface.ICollectionFlowViewConfig)\<`TItem`, `TView`, `TColumnKey`\>

The flow view configuration.
