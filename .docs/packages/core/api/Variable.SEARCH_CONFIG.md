---
title: 'Variable: SEARCH\_CONFIG'
generated: true
editUrl: false
---
# Variable: SEARCH\_CONFIG

```ts
const SEARCH_CONFIG: InjectionToken<ISearchConfig>;
```

Defined in: [search/provider/SEARCH\_CONFIG.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/SEARCH_CONFIG.ts#L14)

Configuration of the search engine, published by `provideSearch(config, ...)`. Both the manager
and every session read it optionally, so the engine also works without it.
