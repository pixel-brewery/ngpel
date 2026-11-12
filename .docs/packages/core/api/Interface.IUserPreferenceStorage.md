---
title: 'Interface: IUserPreferenceStorage'
generated: true
editUrl: false
---
# Interface: IUserPreferenceStorage

Defined in: [storage/preferences/IUserPreferenceStorage.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/IUserPreferenceStorage.ts#L13)

Storage port for user-scoped preferences. Adapters decide where preferences live (Web Storage,
an Electron bridge, an in-memory map); consumers only see typed reads and writes.

## Methods

### read()

```ts
read<T>(key, codec): T | undefined;
```

Defined in: [storage/preferences/IUserPreferenceStorage.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/IUserPreferenceStorage.ts#L25)

Reads a typed preference value.

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

The value, or `undefined` when nothing valid is stored.

***

### remove()

```ts
remove(key): void;
```

Defined in: [storage/preferences/IUserPreferenceStorage.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/IUserPreferenceStorage.ts#L44)

Removes one preference value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Stable preference key. |

#### Returns

`void`

***

### write()

```ts
write<T>(
   key,
   value,
   codec
): void;
```

Defined in: [storage/preferences/IUserPreferenceStorage.ts:36](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/IUserPreferenceStorage.ts#L36)

Writes a typed preference value.

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
