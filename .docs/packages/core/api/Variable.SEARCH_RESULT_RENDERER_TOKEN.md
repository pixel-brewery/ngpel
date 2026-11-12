---
title: 'Variable: SEARCH\_RESULT\_RENDERER\_TOKEN'
generated: true
editUrl: false
---
# Variable: SEARCH\_RESULT\_RENDERER\_TOKEN

```ts
const SEARCH_RESULT_RENDERER_TOKEN: InjectionToken<readonly (readonly ISearchResultRendererEntry[])[]>;
```

Defined in: [search/provider/SEARCH\_RESULT\_RENDERER\_TOKEN.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/SEARCH_RESULT_RENDERER_TOKEN.ts#L15)

Multi-provider token for custom result renderers. Every `withSearchRenderers()` feature
contributes one batch of entries, so the injected value is a list of batches which the surface
flattens.
