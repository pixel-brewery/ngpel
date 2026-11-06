---
title: 'Variable: UPDATE\_STRATEGIES'
generated: true
editUrl: false
---
# Variable: UPDATE\_STRATEGIES

```ts
const UPDATE_STRATEGIES: InjectionToken<readonly IUpdateHandlerStrategy[]>;
```

Defined in: [update/provider/UPDATE\_STRATEGIES.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/UPDATE_STRATEGIES.ts#L14)

Multi-provider token of the registered [IUpdateHandlerStrategy](Interface.IUpdateHandlerStrategy) instances. Every event is
dispatched to all of them in registration order.
