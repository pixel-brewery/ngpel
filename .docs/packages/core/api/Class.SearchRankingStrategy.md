---
title: 'Abstract Class: SearchRankingStrategy'
generated: true
editUrl: false
---
# Abstract Class: SearchRankingStrategy

Defined in: [search/services/SearchRankingStrategy.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchRankingStrategy.ts#L15)

Strategy that orders the items of a search surface. It is used as the DI token of the ranking
implementation; `provideSearch()` binds it to `DefaultSearchRankingStrategy` and applications
override it by providing their own subclass after the composition root.

## Extended by

- [`DefaultSearchRankingStrategy`](Class.DefaultSearchRankingStrategy)

## Constructors

### Constructor

```ts
new SearchRankingStrategy(): SearchRankingStrategy;
```

#### Returns

`SearchRankingStrategy`

## Methods

### rank()

```ts
abstract rank(query, items): readonly (
  | ICommandItem
  | ISearchResult<unknown>)[];
```

Defined in: [search/services/SearchRankingStrategy.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchRankingStrategy.ts#L27)

Orders items for the given query. Implementations must be pure and must not drop items —
limiting is the surface's decision.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The trimmed query; empty while the palette shows its suggestions. |
| `items` | readonly ( \| [`ICommandItem`](Interface.ICommandItem) \| [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>)[] | The items to order. |

#### Returns

readonly (
  \| [`ICommandItem`](Interface.ICommandItem)
  \| [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>)[]

The ordered items.
