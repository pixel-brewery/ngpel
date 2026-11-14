---
title: 'Interface: ICollectionTablePage\<T\>'
generated: true
editUrl: false
---
# Interface: ICollectionTablePage\<T\>

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePage.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePage.ts#L2)

A bounded page of rows, or group paths and full filtered counts from the source.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Properties

### groups?

```ts
readonly groups?: readonly {
  count: number;
  path: readonly unknown[];
}[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePage.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePage.ts#L7)

Counts for all group paths at each level of the filtered collection.

***

### items

```ts
readonly items: readonly T[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePage.ts:3](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePage.ts#L3)

***

### total

```ts
readonly total: number;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePage.ts:5](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePage.ts#L5)

The filtered collection total, or the leaf-group total for a scoped page.
