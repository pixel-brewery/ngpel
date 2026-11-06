---
title: 'Function: provideBrowserStorage()'
generated: true
editUrl: false
---
# Function: provideBrowserStorage()

```ts
function provideBrowserStorage(...features): EnvironmentProviders;
```

Defined in: [storage/angular/provideBrowserStorage.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/provideBrowserStorage.ts#L18)

Composes the browser storage seam. Without features `BROWSER_STORAGE` keeps its root default
(the window's `localStorage`); `withStorage(...)` substitutes another implementation. Two storage
features in one call raise the kernel's feature-conflict error.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<`"storage"`\>[] | The storage features. |

## Returns

`EnvironmentProviders`

Environment providers for the composition root.
