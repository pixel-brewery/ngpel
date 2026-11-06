---
title: 'Interface: ILocalStorageSignalOptions'
generated: true
editUrl: false
---
# Interface: ILocalStorageSignalOptions

Defined in: [storage/angular/signal/ILocalStorageSignalOptions.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/ILocalStorageSignalOptions.ts#L6)

Configures one storage-backed signal.

## Properties

### eventTarget?

```ts
readonly optional eventTarget?: EventTarget | null;
```

Defined in: [storage/angular/signal/ILocalStorageSignalOptions.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/ILocalStorageSignalOptions.ts#L27)

Overrides the source of `storage` events. Defaults to the window of the injected `DOCUMENT`;
passing `null` disables cross-document synchronization.

***

### storage?

```ts
readonly optional storage?: Storage | null;
```

Defined in: [storage/angular/signal/ILocalStorageSignalOptions.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/ILocalStorageSignalOptions.ts#L21)

Overrides the storage implementation. Defaults to the injected `BROWSER_STORAGE`; passing
`null` declares storage unavailable, matching SSR behavior: the signal reads as `undefined`
and `set()`, `update()`, `clear()` and `refresh()` throw `LocalStorageUnavailableError`, per
the policy documented on that error.

***

### syncAcrossTabs?

```ts
readonly optional syncAcrossTabs?: boolean;
```

Defined in: [storage/angular/signal/ILocalStorageSignalOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/ILocalStorageSignalOptions.ts#L13)

Receives changes from other documents of the same origin through the browser `storage`
event. Defaults to `true`.
