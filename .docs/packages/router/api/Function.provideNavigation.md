---
title: 'Function: provideNavigation()'
generated: true
editUrl: false
---
# Function: provideNavigation()

```ts
function provideNavigation(...features): EnvironmentProviders;
```

Defined in: [navigation/provider/provideNavigation.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/navigation/provider/provideNavigation.ts#L31)

Composes the navigation registry: the [NavigationManager](Class.NavigationManager) and the
[NavigationHandleDispatcher](Class.NavigationHandleDispatcher), plus every contributed item and guard. Nothing else is pulled
in — `route:` and `ext:` handles work out of the box, and `cmd:` handles are enabled by binding
an `INavHandleHandler` under `NAV_HANDLE_HANDLER`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly `IFeature`\<[`NavigationFeatureKind`](TypeAlias.NavigationFeatureKind)\>[] | Contributions from `withNavigationItems(...)` and `withNavigationGuard(...)`. |

## Returns

`EnvironmentProviders`

Environment providers for the application composition root.

## Throws

Error when two contributions of the same kind share an id.

## Example

```typescript
provideNavigation(
    withNavigationGuard({ id: 'capabilities', guard: CapabilityNavigationGuard }),
    withUserNavigation(10),
    withSettingsNavigation(90)
);
```
