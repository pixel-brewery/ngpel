---
title: 'Function: enumCodec()'
generated: true
editUrl: false
---
# Function: enumCodec()

```ts
function enumCodec<T>(allowedValues): LocalStorageCodec<T>;
```

Defined in: [storage/codecs/enumCodec.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/enumCodec.ts#L15)

Creates a codec that restricts a persisted string to a compile-time union of allowed values.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `string` | The string union. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `allowedValues` | readonly `T`[] | The allowed values; anything else parses to `undefined` and refuses to serialize. |

## Returns

[`LocalStorageCodec`](TypeAlias.LocalStorageCodec)\<`T`\>

A frozen enum codec.
