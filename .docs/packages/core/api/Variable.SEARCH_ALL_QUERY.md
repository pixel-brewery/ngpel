---
title: 'Variable: SEARCH\_ALL\_QUERY'
generated: true
editUrl: false
---
# Variable: SEARCH\_ALL\_QUERY

```ts
const SEARCH_ALL_QUERY: "*" = '*';
```

Defined in: [search/models/SEARCH\_ALL\_QUERY.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/SEARCH_ALL_QUERY.ts#L9)

Sentinel query understood by `SearchManager.getCommands()`, `SearchManager.search()` and
`SearchManager.query()`: it asks for the complete catalogue instead of a filtered match. The
manager never forwards the sentinel — command sources and search providers are called with an
empty query, which is their documented "return everything you have" input.
