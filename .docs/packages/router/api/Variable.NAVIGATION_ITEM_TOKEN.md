---
title: 'Variable: NAVIGATION\_ITEM\_TOKEN'
generated: true
editUrl: false
---
# Variable: NAVIGATION\_ITEM\_TOKEN

```ts
const NAVIGATION_ITEM_TOKEN: InjectionToken<readonly readonly INavItem[][]>;
```

Defined in: [navigation/NAVIGATION\_ITEM\_TOKEN.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/NAVIGATION_ITEM_TOKEN.ts#L15)

Multi-provider token for the contributed navigation items. Every provider contributes one batch
— the items of one feature library — so the injected value is a list of batches that
`NavigationManager` flattens. `withNavigationItems(...)` fills it.
