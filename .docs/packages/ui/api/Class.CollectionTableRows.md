---
title: 'Class: CollectionTableRows\<T\>'
generated: true
editUrl: false
---
# Class: CollectionTableRows\<T\>

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L24)

Connects existing collection queries to Mosaik's native lazy row provider.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* `object` |

## Constructors

### Constructor

```ts
new CollectionTableRows<T>(options): CollectionTableRows<T>;
```

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L72)

Creates the provider in the owning presenter's Angular injection context.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`ICollectionTableRowsOptions`](Interface.ICollectionTableRowsOptions)\<`T`\> |

#### Returns

`CollectionTableRows`\<`T`\>

## Properties

### columns

```ts
readonly columns: Signal<{
  groupable: boolean;
  sortable: boolean;
}[]>;
```

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L39)

Columns enabled for sorting and grouping by the source.

***

### groupTemplate

```ts
readonly groupTemplate: Signal<(group) => string>;
```

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L47)

Uses the source labels for grouped values.

***

### provider

```ts
readonly provider: Signal<(request) => Promise<ICollectionTableRowsResult>>;
```

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L62)

The function assigned to the Mosaik rows provider.

***

### showEmptyState

```ts
readonly showEmptyState: Signal<boolean>;
```

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L60)

Whether the current initial query completed with no rows.

## Methods

### isDesktop()

```ts
isDesktop(): boolean;
```

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L92)

Whether this view uses its desktop provider at the current breakpoint.

#### Returns

`boolean`

***

### refresh()

```ts
refresh(): void;
```

Defined in: [libs/ui/src/collection-view/views/table/CollectionTableRows.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/CollectionTableRows.ts#L97)

Restarts the native row provider after a source-side change.

#### Returns

`void`
