---
title: 'Interface: ICollectionTableView\<TItem\>'
generated: true
editUrl: false
---
# Interface: ICollectionTableView\<TItem\>

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableView.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableView.ts#L13)

Runtime table projection for a collection view.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-titem"></a> `TItem` |

## Properties

### columnDefinitions

```ts
readonly columnDefinitions: Signal<IDataTableColumnDefinition<TItem>[]>;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableView.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableView.ts#L17)

Data-table column definitions derived from collection fields.

***

### templateColumnDefinitions

```ts
readonly templateColumnDefinitions: Signal<IDataTableColumnDefinition<unknown>[]>;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTableView.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTableView.ts#L22)

Data-table column definitions widened for Angular templates.
