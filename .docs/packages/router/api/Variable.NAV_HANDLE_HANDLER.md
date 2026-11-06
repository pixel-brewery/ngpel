---
title: 'Variable: NAV\_HANDLE\_HANDLER'
generated: true
editUrl: false
---
# Variable: NAV\_HANDLE\_HANDLER

```ts
const NAV_HANDLE_HANDLER: InjectionToken<readonly INavHandleHandler[]>;
```

Defined in: [navigation/NAV\_HANDLE\_HANDLER.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NAV_HANDLE_HANDLER.ts#L14)

Multi-provider token for [INavHandleHandler](Interface.INavHandleHandler) implementations. The last handler registered
for a scheme wins, so a product handler overrides the built-in `route:` and `ext:` behavior.
