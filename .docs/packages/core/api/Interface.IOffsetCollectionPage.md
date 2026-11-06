---
title: 'Interface: IOffsetCollectionPage\<T\>'
generated: true
editUrl: false
---
# Interface: IOffsetCollectionPage\<T\>

Defined in: rx/pagination/IOffsetCollectionPage.ts:7

A page or a combined result from an offset-paginated collection.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The collection item type. |

## Properties

### items

```ts
readonly items: readonly T[];
```

Defined in: rx/pagination/IOffsetCollectionPage.ts:9

Items returned by the request.

***

### total

```ts
readonly total: number;
```

Defined in: rx/pagination/IOffsetCollectionPage.ts:12

The latest total reported by the collection endpoint.
