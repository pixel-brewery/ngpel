---
title: 'Function: jsonCodec()'
generated: true
editUrl: false
---
# Function: jsonCodec()

```ts
function jsonCodec<T>(isValue): LocalStorageCodec<T>;
```

Defined in: [storage/codecs/jsonCodec.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/jsonCodec.ts#L17)

Creates a codec that persists structured JSON only after runtime validation. Validation is
mandatory because storage is mutable outside the application and persisted data must not be
trusted as a TypeScript type assertion.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The structured value type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isValue` | (`candidate`) => `candidate is T` | Runtime type guard applied to parsed payloads and to values before persisting. |

## Returns

[`LocalStorageCodec`](TypeAlias.LocalStorageCodec)\<`T`\>

A frozen JSON codec.
