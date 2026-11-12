---
title: 'Interface: ICollectionListItemContext\<T\>'
generated: true
editUrl: false
---
# Interface: ICollectionListItemContext\<T\>

Defined in: [libs/ui/src/components/collection-list/ICollectionListItemContext.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListItemContext.ts#L7)

Template context supplied for one collection-list item.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Collection item type. |

## Properties

### $implicit

```ts
readonly $implicit: T;
```

Defined in: [libs/ui/src/components/collection-list/ICollectionListItemContext.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListItemContext.ts#L14)

Current collection item.

***

### index

```ts
readonly index: number;
```

Defined in: [libs/ui/src/components/collection-list/ICollectionListItemContext.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/ICollectionListItemContext.ts#L22)

Zero-based position of the item in the collection.
