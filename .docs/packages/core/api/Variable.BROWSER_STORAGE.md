---
title: 'Variable: BROWSER\_STORAGE'
generated: true
editUrl: false
---
# Variable: BROWSER\_STORAGE

```ts
const BROWSER_STORAGE: InjectionToken<Storage | null>;
```

Defined in: [storage/angular/BROWSER\_STORAGE.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/BROWSER_STORAGE.ts#L20)

The single storage seam of ngpel. Defaults to the `localStorage` of the injected `DOCUMENT`'s
window (SSR-safe: `null` when there is no window or the accessor throws). Hosts that need a
different backing store (Electron, Capacitor, tests) bind it through
`provideBrowserStorage(withStorage(...))`; `localStorageSignal` and the user-preference adapter
of `withLocalStorage()` both resolve through it.

The token resolves to `null` — never `undefined` — when storage is unavailable, and the surfaces
built on it then follow the policy documented on `LocalStorageUnavailableError`.
