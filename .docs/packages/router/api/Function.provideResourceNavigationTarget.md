---
title: 'Function: provideResourceNavigationTarget()'
generated: true
editUrl: false
---
# Function: provideResourceNavigationTarget()

```ts
function provideResourceNavigationTarget(target): Provider;
```

Defined in: navigation/resource-navigation/provideResourceNavigationTarget.ts:12

Contributes a feature resource link at application composition.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | \| [`IResourceNavigationTarget`](Interface.IResourceNavigationTarget) \| (() => [`IResourceNavigationTarget`](Interface.IResourceNavigationTarget)) | A target or a factory that can inject feature collaborators. |

## Returns

`Provider`

A multi-provider for the application injector.
