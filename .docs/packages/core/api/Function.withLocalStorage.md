---
title: 'Function: withLocalStorage()'
generated: true
editUrl: false
---
# Function: withLocalStorage()

```ts
function withLocalStorage(): IFeature<"storage">;
```

Defined in: [storage/preferences/withLocalStorage.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/withLocalStorage.ts#L21)

Stores preferences in the storage bound to `BROWSER_STORAGE` — the window's `localStorage` by
default, or whatever the host substituted through `provideBrowserStorage(withStorage(...))`.
The adapter is only reachable through this call, so the token itself stays adapter-free.

## Returns

[`IFeature`](Interface.IFeature)\<`"storage"`\>

The storage feature for `provideUserPreferences()`.
