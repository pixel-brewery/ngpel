---
title: 'Variable: SEARCH\_COMMAND\_TOKEN'
generated: true
editUrl: false
---
# Variable: SEARCH\_COMMAND\_TOKEN

```ts
const SEARCH_COMMAND_TOKEN: InjectionToken<readonly readonly ICommandItem[][]>;
```

Defined in: [search/provider/SEARCH\_COMMAND\_TOKEN.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/SEARCH_COMMAND_TOKEN.ts#L15)

Multi-provider token for statically contributed command items. Every `withSearchCommands()`
feature contributes one batch — the commands of one feature — so the injected value is a list of
batches which the manager flattens.
