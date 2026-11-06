---
title: 'Interface: ISearchResultRendererEntry'
generated: true
editUrl: false
---
# Interface: ISearchResultRendererEntry

Defined in: [search/models/ISearchResultRendererEntry.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResultRendererEntry.ts#L14)

Registration of a component that renders the rows of one result kind. The surface instantiates
it dynamically and owns the input contract it is bound with; the engine only carries the
registration.

## Properties

### component

```ts
readonly component: Type<unknown>;
```

Defined in: [search/models/ISearchResultRendererEntry.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResultRendererEntry.ts#L26)

Standalone component rendering one result row.

***

### id

```ts
readonly id: string;
```

Defined in: [search/models/ISearchResultRendererEntry.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResultRendererEntry.ts#L21)

Renderer key. It is matched against `ISearchResult.rendererId` and, when the result declares
none, against `ISearchResult.providerId`.
