---
title: 'Function: readStorageValue()'
generated: true
editUrl: false
---
# Function: readStorageValue()

```ts
function readStorageValue<T>(
   storage,
   key,
   codec
): T | undefined;
```

Defined in: [storage/browser/readStorageValue.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/browser/readStorageValue.ts#L18)

Reads and parses one value from a storage area. This is the framework-free read path for call
sites outside an injection context, such as bootstrap configuration.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The typed application value. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storage` | `Pick`\<`Storage`, `"getItem"`\> | The storage to read from. |
| `key` | `string` | The storage key. |
| `codec` | [`IValueCodec`](Interface.IValueCodec)\<`string`, `T`\> | The codec used to parse the persisted representation. |

## Returns

`T` \| `undefined`

The parsed value, or `undefined` when nothing is stored or the stored value is invalid.
