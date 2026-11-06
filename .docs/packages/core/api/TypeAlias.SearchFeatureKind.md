---
title: 'Type Alias: SearchFeatureKind'
generated: true
editUrl: false
---
# Type Alias: SearchFeatureKind

```ts
type SearchFeatureKind = "search-commands" | "search-providers" | "search-renderers";
```

Defined in: [search/provider/SearchFeatureKind.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/SearchFeatureKind.ts#L7)

The kind vocabulary of the search composition root. All three kinds are multi: any number of
features may contribute commands, providers and renderers.
