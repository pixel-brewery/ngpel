---
title: 'Function: presentationRoutes()'
generated: true
editUrl: false
---
# Function: presentationRoutes()

```ts
function presentationRoutes(children, options): Routes;
```

Defined in: [shell/presentationRoutes.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/shell/presentationRoutes.ts#L30)

Wraps the feature routes of an application in one guarded shell route. It exists so the shell
mount point, its guards and its default child are declared once instead of being copied into
every product's route file — the shell component itself stays in the product.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `children` | `Routes` | The feature routes rendered inside the shell. |
| `options` | [`IPresentationRoutesOptions`](Interface.IPresentationRoutesOptions) | The shell loader, its mount path, default child and guards. |

## Returns

`Routes`

The routes to spread into the application route configuration.

## Example

```typescript
export const appRoutes: Routes = [
    ...presentationRoutes(featureRoutes, {
        shell: () => import('./AppShellView').then((m) => m.AppShellView),
        redirectTo: 'explore',
        guards: { canActivate: [authenticationGuard] }
    }),
    ...publicRoutes
];
```
