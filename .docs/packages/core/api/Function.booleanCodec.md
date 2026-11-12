---
title: 'Function: booleanCodec()'
generated: true
editUrl: false
---
# Function: booleanCodec()

```ts
function booleanCodec(trueValue?, falseValue?): LocalStorageCodec<boolean>;
```

Defined in: [storage/codecs/booleanCodec.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/booleanCodec.ts#L15)

Creates a codec that persists boolean values with explicit textual representations.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `trueValue?` | `string` | `'true'` | The serialized representation of `true` (defaults to `'true'`). |
| `falseValue?` | `string` | `'false'` | The serialized representation of `false` (defaults to `'false'`). |

## Returns

[`LocalStorageCodec`](TypeAlias.LocalStorageCodec)\<`boolean`\>

A frozen boolean codec.
