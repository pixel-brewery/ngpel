---
title: 'Variable: SEARCH\_PROVIDER\_TOKEN'
generated: true
editUrl: false
---
# Variable: SEARCH\_PROVIDER\_TOKEN

```ts
const SEARCH_PROVIDER_TOKEN: InjectionToken<readonly (readonly ISearchProvider<unknown>[])[]>;
```

Defined in: [search/provider/SEARCH\_PROVIDER\_TOKEN.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/SEARCH_PROVIDER_TOKEN.ts#L14)

Multi-provider token for semantic search providers. Every registered provider class contributes
one batch, so the injected value is a list of batches which the manager flattens.
