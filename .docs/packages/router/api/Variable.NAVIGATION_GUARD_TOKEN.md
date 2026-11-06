---
title: 'Variable: NAVIGATION\_GUARD\_TOKEN'
generated: true
editUrl: false
---
# Variable: NAVIGATION\_GUARD\_TOKEN

```ts
const NAVIGATION_GUARD_TOKEN: InjectionToken<readonly INavigationGuard[]>;
```

Defined in: [navigation/NAVIGATION\_GUARD\_TOKEN.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NAVIGATION_GUARD_TOKEN.ts#L14)

Multi-provider token for the navigation guards. Every provider contributes one guard;
`withNavigationGuard(...)` fills it.
