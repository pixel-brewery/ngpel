---
title: 'Type Alias: NavigationFeatureKind'
generated: true
editUrl: false
---
# Type Alias: NavigationFeatureKind

```ts
type NavigationFeatureKind = "item" | "guard";
```

Defined in: [navigation/provider/NavigationFeatureKind.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/NavigationFeatureKind.ts#L13)

The kinds of features `provideNavigation(...)` accepts. Both kinds are multi: any number of
feature libraries may contribute items, and any number of policies may guard them.
