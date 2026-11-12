---
title: 'Class: WebStorageUserPreferenceStorage'
generated: true
editUrl: false
---
# Class: WebStorageUserPreferenceStorage

Defined in: [storage/preferences/WebStorageUserPreferenceStorage.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/WebStorageUserPreferenceStorage.ts#L19)

Web Storage adapter of the user-preference port. Values are stored as JSON under their key;
the codec validates the parsed payload. Backs `withLocalStorage()` and `withSessionStorage()`.

Without storage the adapter follows the same unavailable-storage policy as `localStorageSignal`,
documented on `LocalStorageUnavailableError`: `read()` yields `undefined`, `write()` and
`remove()` throw that error.

## Implements

- [`IUserPreferenceStorage`](Interface.IUserPreferenceStorage)

## Constructors

### Constructor

```ts
new WebStorageUserPreferenceStorage(storage): WebStorageUserPreferenceStorage;
```

Defined in: [storage/preferences/WebStorageUserPreferenceStorage.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/WebStorageUserPreferenceStorage.ts#L34)

Constructs a new instance of the `WebStorageUserPreferenceStorage` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storage` | `Storage` \| `null` | The backing storage, or `null` when storage is unavailable. |

#### Returns

`WebStorageUserPreferenceStorage`

## Methods

### read()

```ts
read<T>(key, codec): T | undefined;
```

Defined in: [storage/preferences/WebStorageUserPreferenceStorage.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/WebStorageUserPreferenceStorage.ts#L51)

Reads a typed preference from storage.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The preference value type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Stable preference key. |
| `codec` | [`IUserPreferenceCodec`](TypeAlias.IUserPreferenceCodec)\<`T`\> | Codec used to validate the stored payload. |

#### Returns

`T` \| `undefined`

The value, or `undefined` when storage is unavailable, empty or holds invalid JSON.

#### Implementation of

[`IUserPreferenceStorage`](Interface.IUserPreferenceStorage).[`read`](Interface.IUserPreferenceStorage#read)

***

### remove()

```ts
remove(key): void;
```

Defined in: [storage/preferences/WebStorageUserPreferenceStorage.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/WebStorageUserPreferenceStorage.ts#L90)

Removes a preference from storage.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Stable preference key. |

#### Returns

`void`

#### Throws

LocalStorageUnavailableError when storage is unavailable.

#### Implementation of

[`IUserPreferenceStorage`](Interface.IUserPreferenceStorage).[`remove`](Interface.IUserPreferenceStorage#remove)

***

### write()

```ts
write<T>(
   key,
   value,
   codec
): void;
```

Defined in: [storage/preferences/WebStorageUserPreferenceStorage.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/WebStorageUserPreferenceStorage.ts#L79)

Writes a typed preference to storage as JSON.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-1"></a> `T` | The preference value type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Stable preference key. |
| `value` | `T` | Preference value. |
| `codec` | [`IUserPreferenceCodec`](TypeAlias.IUserPreferenceCodec)\<`T`\> | Codec used to serialize the value. |

#### Returns

`void`

#### Throws

LocalStorageUnavailableError when storage is unavailable.

#### Implementation of

[`IUserPreferenceStorage`](Interface.IUserPreferenceStorage).[`write`](Interface.IUserPreferenceStorage#write)
