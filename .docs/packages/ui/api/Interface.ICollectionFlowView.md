---
title: 'Interface: ICollectionFlowView\<TItem, TColumnKey\>'
generated: true
editUrl: false
---
# Interface: ICollectionFlowView\<TItem, TColumnKey\>

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts#L12)

Runtime flow projection for a collection view.

## Extends

- `Omit`\<[`ICollectionFlowViewConfig`](Interface.ICollectionFlowViewConfig)\<`TItem`, `string`, `TColumnKey`\>, `"type"` \| `"label"` \| `"iconName"` \| `"viewKind"` \| `"columnExpansionStorageKey"`\>

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-titem"></a> `TItem` | - |
| <a id="type-parameter-tcolumnkey"></a> `TColumnKey` *extends* `string` | `string` |

## Properties

### columnKey

```ts
readonly columnKey: (item) => TColumnKey;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L27)

Resolves the column key for an item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`TColumnKey`

#### Inherited from

`Omit.columnKey`

***

### columns

```ts
readonly columns: readonly {
  key: TColumnKey;
  title: string;
}[];
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L32)

Declares all columns that can be shown in the board.

#### Inherited from

`Omit.columns`

***

### isColumnExpanded

```ts
readonly isColumnExpanded: (columnKey) => boolean;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts#L24)

Resolves the restored expanded state of one column.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `columnKey` | `TColumnKey` |

#### Returns

`boolean`

***

### itemKey

```ts
readonly itemKey: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L22)

Resolves the stable item key.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

`Omit.itemKey`

***

### itemSubtitle?

```ts
readonly itemSubtitle?: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L47)

Resolves the optional subtitle shown on a board item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

`Omit.itemSubtitle`

***

### itemTitle

```ts
readonly itemTitle: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L42)

Resolves the title shown on a board item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

`Omit.itemTitle`

***

### onColumnExpansionChanged

```ts
readonly onColumnExpansionChanged: (change) => void;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts#L29)

Applies and persists a Mosaik column expansion change.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `change` | `unknown` |

#### Returns

`void`

***

### viewIconName?

```ts
readonly viewIconName?: string;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowView.ts#L19)

Optional icon name used by feature-specific view toggles.
