---
title: 'Type Alias: LocalStorageSignal\<T\>'
generated: true
editUrl: false
---
# Type Alias: LocalStorageSignal\<T\>

```ts
type LocalStorageSignal<T> = Signal<T | undefined> & {
  clear(): void;
  refresh(): void;
  set(value): void;
  update(updater): void;
};
```

Defined in: [storage/angular/signal/LocalStorageSignal.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/LocalStorageSignal.ts#L22)

A storage-backed Angular signal. `set()`, `update()` and `clear()` synchronously write the
storage first and then the signal; other instances on the same key in this document are
notified directly, other documents through the browser `storage` event.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The typed application value. |

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `clear()` | () => `void` | Removes the key. **Throws** LocalStorageUnavailableError when storage is unavailable. | [storage/angular/signal/LocalStorageSignal.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/LocalStorageSignal.ts#L44) |
| `refresh()` | () => `void` | Reloads the current value from storage, for integration with same-document code that writes to storage directly instead of through a signal. **Throws** LocalStorageUnavailableError when storage is unavailable. | [storage/angular/signal/LocalStorageSignal.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/LocalStorageSignal.ts#L52) |
| `set()` | (`value`) => `void` | Persists a value; `undefined` removes the key. **Throws** LocalStorageUnavailableError when storage is unavailable. | [storage/angular/signal/LocalStorageSignal.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/LocalStorageSignal.ts#L30) |
| `update()` | (`updater`) => `void` | Re-reads the stored value and persists the updater's result. **Throws** LocalStorageUnavailableError when storage is unavailable. | [storage/angular/signal/LocalStorageSignal.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/angular/signal/LocalStorageSignal.ts#L37) |
