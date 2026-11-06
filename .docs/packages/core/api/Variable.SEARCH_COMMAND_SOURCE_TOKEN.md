---
title: 'Variable: SEARCH\_COMMAND\_SOURCE\_TOKEN'
generated: true
editUrl: false
---
# Variable: SEARCH\_COMMAND\_SOURCE\_TOKEN

```ts
const SEARCH_COMMAND_SOURCE_TOKEN: InjectionToken<readonly readonly ICommandSource[][]>;
```

Defined in: [search/provider/SEARCH\_COMMAND\_SOURCE\_TOKEN.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/SEARCH_COMMAND_SOURCE_TOKEN.ts#L14)

Multi-provider token for dynamic command sources. Every registered source class contributes one
batch, so the injected value is a list of batches which the manager flattens.
