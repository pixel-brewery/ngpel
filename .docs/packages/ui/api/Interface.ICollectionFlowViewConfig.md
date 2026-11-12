---
title: 'Interface: ICollectionFlowViewConfig\<TItem, TView, TColumnKey\>'
generated: true
editUrl: false
---
# Interface: ICollectionFlowViewConfig\<TItem, TView, TColumnKey\>

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L13)

Configuration for the flow projection of a collection view.

## Extends

- [`ICollectionViewDefinition`](Interface.ICollectionViewDefinition)\<`TView`\>

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-titem"></a> `TItem` | - |
| <a id="type-parameter-tview"></a> `TView` *extends* `string` | - |
| <a id="type-parameter-tcolumnkey"></a> `TColumnKey` *extends* `string` | `string` |

## Properties

### columnExpansionStorageKey

```ts
readonly columnExpansionStorageKey: string;
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L37)

Local-storage key used to restore collapsed columns for this board.

***

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

***

### iconName?

```ts
readonly iconName?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L20)

Optional icon name used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`iconName`](Interface.ICollectionViewDefinition#iconname)

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

***

### label?

```ts
readonly label?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L15)

Optional display label used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`label`](Interface.ICollectionViewDefinition#label)

***

### type

```ts
readonly type: TView;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L10)

Stable view type key.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`type`](Interface.ICollectionViewDefinition#type)

***

### viewKind

```ts
readonly viewKind: "flow";
```

Defined in: [libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/ICollectionFlowViewConfig.ts#L17)

Discriminator used by the collection-view factory.
