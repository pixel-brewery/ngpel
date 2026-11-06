---
title: 'Interface: IWithSearchRenderersOptions'
generated: true
editUrl: false
---
# Interface: IWithSearchRenderersOptions

Defined in: [search/provider/IWithSearchRenderersOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchRenderersOptions.ts#L12)

Options for contributing result renderers through `withSearchRenderers()`.

## Properties

### entries

```ts
readonly entries: readonly ISearchResultRendererEntry[];
```

Defined in: [search/provider/IWithSearchRenderersOptions.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchRenderersOptions.ts#L24)

Renderer registrations. Their ids match `ISearchResult.rendererId` or, as a fallback, the
producing provider id.

***

### id

```ts
readonly id: string;
```

Defined in: [search/provider/IWithSearchRenderersOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchRenderersOptions.ts#L18)

Stable unique id of this contribution (unique among all renderer features).
