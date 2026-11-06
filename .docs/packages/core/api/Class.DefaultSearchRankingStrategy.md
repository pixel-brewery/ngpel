---
title: 'Class: DefaultSearchRankingStrategy'
generated: true
editUrl: false
---
# Class: DefaultSearchRankingStrategy

Defined in: [search/services/DefaultSearchRankingStrategy.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/DefaultSearchRankingStrategy.ts#L18)

Default ranking: an exact label match wins over a label prefix, a label prefix over a label
substring, and both text fields of lower weight (description, keywords) come last. Items that
match nowhere keep their contributed order behind the matches, because the sort is stable.

## Extends

- [`SearchRankingStrategy`](Class.SearchRankingStrategy)

## Constructors

### Constructor

```ts
new DefaultSearchRankingStrategy(): DefaultSearchRankingStrategy;
```

Defined in: [search/services/DefaultSearchRankingStrategy.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/DefaultSearchRankingStrategy.ts#L26)

Constructs a new instance of the `DefaultSearchRankingStrategy` class.

#### Returns

`DefaultSearchRankingStrategy`

#### Overrides

[`SearchRankingStrategy`](Class.SearchRankingStrategy).[`constructor`](Class.SearchRankingStrategy#constructor)

## Methods

### rank()

```ts
rank(query, items): readonly (
  | ICommandItem
  | ISearchResult<unknown>)[];
```

Defined in: [search/services/DefaultSearchRankingStrategy.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/DefaultSearchRankingStrategy.ts#L43)

Orders exact and prefix matches before loose keyword matches. An empty query keeps the
contributed order.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The trimmed query. |
| `items` | readonly ( \| [`ICommandItem`](Interface.ICommandItem) \| [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>)[] | The items to order. |

#### Returns

readonly (
  \| [`ICommandItem`](Interface.ICommandItem)
  \| [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>)[]

The ordered items.

#### Overrides

[`SearchRankingStrategy`](Class.SearchRankingStrategy).[`rank`](Class.SearchRankingStrategy#rank)
