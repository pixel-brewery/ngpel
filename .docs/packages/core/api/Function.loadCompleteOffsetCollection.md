---
title: 'Function: loadCompleteOffsetCollection()'
generated: true
editUrl: false
---
# Function: loadCompleteOffsetCollection()

```ts
function loadCompleteOffsetCollection<T>(
   loadPage,
   pageSize?,
   limits?
): Observable<IOffsetCollectionPage<T>>;
```

Defined in: [rx/pagination/loadCompleteOffsetCollection.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/pagination/loadCompleteOffsetCollection.ts#L25)

Loads offset pages sequentially and emits their combined items and the latest reported total.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The collection item type. |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `loadPage` | (`skip`, `take`) => `Observable`\<[`IOffsetCollectionPage`](Interface.IOffsetCollectionPage)\<`T`\>\> | `undefined` | Loads a page for the supplied offset and requested size. |
| `pageSize?` | `number` | `DEFAULT_PAGE_SIZE` | Requested size per page. Finite values are truncated and raised to at least one. NaN and infinite sizes use the default of 100. |
| `limits?` | [`IOffsetCollectionLimits`](Interface.IOffsetCollectionLimits) | `{}` | Positive integer limits on page requests and accumulated items. |

## Returns

`Observable`\<[`IOffsetCollectionPage`](Interface.IOffsetCollectionPage)\<`T`\>\>

A cold observable of the combined collection.

## Remarks

Each subscription loads the collection afresh. Each request must emit a page and complete.
An empty page ends the collection even if its reported total is higher. Errors and
exceeded limits fail the load, and unsubscribing cancels the active request.
