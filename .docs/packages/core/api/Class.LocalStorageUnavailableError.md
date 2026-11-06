---
title: 'Class: LocalStorageUnavailableError'
generated: true
editUrl: false
---
# Class: LocalStorageUnavailableError

Defined in: [storage/browser/LocalStorageUnavailableError.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/browser/LocalStorageUnavailableError.ts#L29)

Error raised when a storage operation cannot be performed because browser storage is unavailable:
outside a browser (server-side rendering), when the window denies the storage accessor, or when
the host bound `BROWSER_STORAGE` to `null` on purpose.

This error carries the single unavailable-storage policy of `@pixel-brewery/ngpel-core/storage`.
Every surface of the entry point — `localStorageSignal()` and every `IUserPreferenceStorage`
adapter — follows it:

- Implicit reads degrade. A signal starts out `undefined`, `IUserPreferenceStorage.read()` returns
  `undefined` and cross-document listeners are never attached, so an application still renders
  and behaves as if nothing had been persisted yet.
- Mutations and explicit re-reads fail loud. `set()`, `update()`, `clear()`, `refresh()`,
  `write()` and `remove()` throw this error instead of dropping the value, because a silently
  discarded write is data loss the caller cannot detect.

Hosts for which persistence is optional catch it at the call site; hosts that require persistence
let it surface. Hosts that render without storage on purpose bind
`provideBrowserStorage(withStorage(null))` and keep their writes out of that code path.

## Extends

- `Error`

## Constructors

### Constructor

```ts
new LocalStorageUnavailableError(key, operation): LocalStorageUnavailableError;
```

Defined in: [storage/browser/LocalStorageUnavailableError.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/browser/LocalStorageUnavailableError.ts#L46)

Constructs a new instance of the `LocalStorageUnavailableError` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The storage key of the failed operation. |
| `operation` | [`LocalStorageOperation`](TypeAlias.LocalStorageOperation) | The operation that failed. |

#### Returns

`LocalStorageUnavailableError`

#### Overrides

```ts
Error.constructor
```

## Accessors

### key

#### Get Signature

```ts
get key(): string;
```

Defined in: [storage/browser/LocalStorageUnavailableError.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/browser/LocalStorageUnavailableError.ts#L62)

The storage key of the failed operation.

##### Returns

`string`

***

### operation

#### Get Signature

```ts
get operation(): LocalStorageOperation;
```

Defined in: [storage/browser/LocalStorageUnavailableError.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/browser/LocalStorageUnavailableError.ts#L71)

The operation that failed.

##### Returns

[`LocalStorageOperation`](TypeAlias.LocalStorageOperation)
