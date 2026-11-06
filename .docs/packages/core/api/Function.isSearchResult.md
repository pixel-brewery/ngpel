---
title: 'Function: isSearchResult()'
generated: true
editUrl: false
---
# Function: isSearchResult()

```ts
function isSearchResult(value): value is ISearchResult<unknown>;
```

Defined in: [search/models/isSearchResult.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/isSearchResult.ts#L16)

Narrows a search surface item to a semantic search result. Commands are rejected first, so the
two guards partition the item union exactly.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The value to test. |

## Returns

`value is ISearchResult<unknown>`

`true` when the value is an [ISearchResult](Interface.ISearchResult).
