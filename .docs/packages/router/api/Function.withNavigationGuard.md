---
title: 'Function: withNavigationGuard()'
generated: true
editUrl: false
---
# Function: withNavigationGuard()

```ts
function withNavigationGuard(options): IFeature<NavigationFeatureKind>;
```

Defined in: [navigation/provider/withNavigationGuard.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/withNavigationGuard.ts#L23)

Contributes a navigation guard. Guards decide which items a user may see; which capabilities
that means stays a product policy.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IWithNavigationGuardOptions`](Interface.IWithNavigationGuardOptions) | The contribution id and the guard class. |

## Returns

`IFeature`\<[`NavigationFeatureKind`](TypeAlias.NavigationFeatureKind)\>

A feature for `provideNavigation(...)`.

## Example

```typescript
provideNavigation(withNavigationGuard({ id: 'capabilities', guard: CapabilityNavigationGuard }));
```
