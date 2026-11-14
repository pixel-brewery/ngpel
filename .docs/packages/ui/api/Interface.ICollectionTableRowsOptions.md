---
title: 'Interface: ICollectionTableRowsOptions\<T\>'
generated: true
editUrl: false
---
# Interface: ICollectionTableRowsOptions\<T\>

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L7)

Host capabilities and data callbacks for a desktop table backed by a paged source.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Properties

### columns

```ts
readonly columns: () => readonly IDataTableColumnDefinition<unknown>[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L10)

#### Returns

readonly `IDataTableColumnDefinition`\<`unknown`\>[]

***

### emptyGroupLabel

```ts
readonly emptyGroupLabel: () => string;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L15)

#### Returns

`string`

***

### enabled?

```ts
readonly enabled?: () => boolean;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L20)

#### Returns

`boolean`

***

### groupingFields

```ts
readonly groupingFields: readonly string[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L8)

***

### groupLabels

```ts
readonly groupLabels: () => readonly {
  key: string;
  options?: readonly {
     label: string;
     value: unknown;
  }[];
}[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L11)

#### Returns

readonly \{
  `key`: `string`;
  `options?`: readonly \{
     `label`: `string`;
     `value`: `unknown`;
  \}[];
\}[]

***

### loadPage

```ts
readonly loadPage: (skip, take, query) => Observable<ICollectionTablePage<T>>;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L16)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `skip` | `number` |
| `take` | `number` |
| `query` | [`ICollectionTablePageQuery`](Interface.ICollectionTablePageQuery) |

#### Returns

`Observable`\<[`ICollectionTablePage`](Interface.ICollectionTablePage)\<`T`\>\>

***

### onCompact

```ts
readonly onCompact: () => void;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L22)

#### Returns

`void`

***

### onDesktop

```ts
readonly onDesktop: () => void;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L21)

#### Returns

`void`

***

### receiveFailure?

```ts
readonly receiveFailure?: () => void;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L18)

#### Returns

`void`

***

### receiveLoading?

```ts
readonly receiveLoading?: (loading) => void;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L19)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `loading` | `boolean` |

#### Returns

`void`

***

### receiveRows

```ts
readonly receiveRows: (items, total) => void;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `items` | `T`[] |
| `total` | `number` |

#### Returns

`void`

***

### sortingFields

```ts
readonly sortingFields: readonly string[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableRowsOptions.ts#L9)
