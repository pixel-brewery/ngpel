---
title: 'Function: localStorageSignal()'
generated: true
editUrl: false
---
# Function: localStorageSignal()

```ts
function localStorageSignal<T>(
   key,
   codec,
   options?
): LocalStorageSignal<T>;
```

Defined in: [storage/angular/signal/LocalStorageSignal.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/LocalStorageSignal.ts#L73)

Creates a storage-backed signal without exposing an injectable storage service to feature
code. Must be called in an injection context (a field initializer or constructor). Co-located
with the [LocalStorageSignal](TypeAlias.LocalStorageSignal) type because a separate `localStorageSignal.ts` would collide
with `LocalStorageSignal.ts` on case-insensitive file systems.

Without storage the signal follows the unavailable-storage policy documented on
`LocalStorageUnavailableError`: it reads as `undefined` and every mutation throws that error.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The typed application value. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The storage key. |
| `codec` | [`IValueCodec`](Interface.IValueCodec)\<`string`, `T`\> | The codec converting between the stored string and the typed value. |
| `options` | [`ILocalStorageSignalOptions`](Interface.ILocalStorageSignalOptions) | Storage, event source and cross-tab overrides. |

## Returns

[`LocalStorageSignal`](TypeAlias.LocalStorageSignal)\<`T`\>

The storage-backed signal.
