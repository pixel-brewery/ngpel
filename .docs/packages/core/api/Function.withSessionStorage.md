---
title: 'Function: withSessionStorage()'
generated: true
editUrl: false
---
# Function: withSessionStorage()

```ts
function withSessionStorage(): IFeature<"storage">;
```

Defined in: [storage/preferences/withSessionStorage.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/withSessionStorage.ts#L27)

Stores preferences in the `sessionStorage` of the injected `DOCUMENT`'s window, so they live
only as long as the browsing session.

Unlike `withLocalStorage()`, this feature deliberately does not resolve through `BROWSER_STORAGE`:
that token names one storage instance and has no area dimension, so honouring it would turn a
session-scoped preference into a persistent one behind the caller's back. A host that substitutes
its own store through `provideBrowserStorage(withStorage(...))` therefore substitutes it for
`withLocalStorage()` alone; a host that needs a substituted session store binds
`withUserPreferenceStorage()` with its own adapter instead.

## Returns

[`IFeature`](Interface.IFeature)\<`"storage"`\>

The storage feature for `provideUserPreferences()`.
