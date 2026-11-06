---
title: 'Function: withNavigationItems()'
generated: true
editUrl: false
---
# Function: withNavigationItems()

```ts
function withNavigationItems(options): IFeature<NavigationFeatureKind>;
```

Defined in: [navigation/provider/withNavigationItems.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/withNavigationItems.ts#L31)

Contributes navigation items. A feature library exports one such contribution; the composition
root passes it to `provideNavigation(...)` and decides its `order` there.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IWithNavigationItemsOptions`](Interface.IWithNavigationItemsOptions) | The contribution id, its items and their default order. |

## Returns

`IFeature`\<[`NavigationFeatureKind`](TypeAlias.NavigationFeatureKind)\>

A feature for `provideNavigation(...)`.

## Example

```typescript
export function withUserNavigation(order?: number): IFeature<NavigationFeatureKind> {
    return withNavigationItems({
        id: 'user-navigation',
        order,
        items: { key: 'users', label: 'app.nav.users', icon: 'people', region: 'main', handle: 'route:/main/users' }
    });
}
```
