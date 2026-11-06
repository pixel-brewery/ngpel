---
title: 'Function: writeStorageValue()'
generated: true
editUrl: false
---
# Function: writeStorageValue()

```ts
function writeStorageValue<T>(
   storage,
   key,
   value,
   codec
): string | null;
```

Defined in: [storage/browser/writeStorageValue.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/browser/writeStorageValue.ts#L20)

Serializes and writes one value to a storage area; `undefined` removes the key. This is the
framework-free write path for call sites outside an injection context.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The typed application value. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storage` | `Pick`\<`Storage`, `"setItem"` \| `"removeItem"`\> | The storage to write to. |
| `key` | `string` | The storage key. |
| `value` | `T` \| `undefined` | The value to persist, or `undefined` to remove the key. |
| `codec` | [`IValueCodec`](Interface.IValueCodec)\<`string`, `T`\> | The codec used to serialize the value. |

## Returns

`string` \| `null`

The serialized representation that was written, or `null` when the key was removed.

## Throws

TypeError when the codec refuses to serialize the value.
