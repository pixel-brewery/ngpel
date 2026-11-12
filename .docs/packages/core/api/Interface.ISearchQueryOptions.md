---
title: 'Interface: ISearchQueryOptions'
generated: true
editUrl: false
---
# Interface: ISearchQueryOptions

Defined in: [search/models/ISearchQueryOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchQueryOptions.ts#L12)

Optional observation and cancellation of one search request.

## Properties

### onResults?

```ts
readonly onResults?: (results) => void;
```

Defined in: [search/models/ISearchQueryOptions.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchQueryOptions.ts#L17)

Receives the deduplicated semantic results of the providers that have answered so far, in
provider registration order. The search promise still resolves with the final results.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `results` | readonly [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>[] |

#### Returns

`void`

***

### signal?

```ts
readonly signal?: AbortSignal;
```

Defined in: [search/models/ISearchQueryOptions.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchQueryOptions.ts#L22)

Cancels the request and stops delivery of further results.
